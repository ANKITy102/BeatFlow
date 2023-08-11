import { authOptions } from "@/lib/authOptions";
import Songs from "@/models/Song";
import { connectDB } from "@/utils/connectDB";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const auth = async (req: any) => {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (
    session?.user.email === process.env.ADMIN1 ||
    session?.user.email === process.env.ADMIN2
  ) {
    if (session?.user) return session?.user;
    else return null;
  } else {
    return null;
  }
}; // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 10 } })
    // Set permissions and file types for this FileRoute
    .middleware(async (req) => {
      // This code runs on your server before upload
      const user = await auth(req);

      // If you throw, the user will not be able to upload
      if (!user) throw new Error("Unauthorized");
      console.log(user.id);
      // // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);
    }),

  /**  --------------------------------------------------------------- ---------------------------------------   */

  audioUploader: f({ audio: { maxFileSize: "16MB", maxFileCount: 1 } })
    .middleware(async (req) => {
      const user = await auth(req);

      // If you throw, the user will not be able to upload
      if (!user) throw new Error("Unauthorized");
      console.log(user.id);
      // // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      await connectDB();
      const savedSong = await Songs.create({
        url: file.url,
        name: file.name,
      });
      return savedSong;

      // await connectDB();
    }),

  /**  --------------------------------------------------------------- ---------------------------------------   */
  messageAttachment: f(["audio", "image"])
    .middleware(async ({ req }) => {
      const user = await auth(req);

      // If you throw, the user will not be able to upload
      if (!user) throw new Error("Unauthorized");
      console.log(user.id);
      // // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete((data) => {
      console.log("file this is me");
    }),

  // Takes a 4 2mb images and/or 1 256mb video
  mediaPost: f({
    image: { maxFileSize: "2MB", maxFileCount: 1 },
    video: { maxFileSize: "256MB", maxFileCount: 1 },
    audio: { maxFileSize: "16MB", maxFileCount: 1 },
  })
    .middleware((req) => {
      return {
        secret: "hithere",
      };
    })
    .onUploadComplete((data) => console.log("file", data)),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
