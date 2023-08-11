import { authOptions } from "@/lib/authOptions";
import Songs from "@/models/Song";
import { connectDB } from "@/utils/connectDB";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (session) {
      if (session?.user) {
        await connectDB();
        const songs = await Songs.find({});

        return new Response(JSON.stringify(songs), { status: 200 });
      } else {
        return new Response(JSON.stringify({ status: "fail", messsage:"Not Authorized" }), {
          status: 401,
        });
      }
    } else {
      return new Response(JSON.stringify({ status: "fail", message:"Not Authorized" }), {
        status: 401,
      });
    }
  } catch (error) {}
}
