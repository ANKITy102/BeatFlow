import { authOptions } from "@/lib/authOptions";
import Songs from "@/models/Song";
import User from "@/models/User";
import UserSong from "@/models/UserSong";
import { connectDB } from "@/utils/connectDB";
import { getServerSession } from "next-auth";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (session) {
      if (session?.user) {
        await connectDB();
        const id = params.id;
        const userid = session.user.id;
        const userDb = await User.findById(userid);

        if (!userDb) {
          return new Response(
            JSON.stringify({ status: "fail", messsage: "User Not found" }),
            {
              status: 401,
            }
          );
        }
        const findSong = await Songs.findById(id);
        if (!findSong) {
          return new Response(
            JSON.stringify({ status: "fail", messsage: "Song Not found" }),
            {
              status: 401,
            }
          );
        }
        const newLikedSong = new UserSong({
            song: findSong._id, // Assuming you have a field named `song` in UserSong schema
            // Add any other properties you need here
        });
        newLikedSong.save();
        await User.findByIdAndUpdate(
            userid,
            {
                $push: { LikedPlayList: newLikedSong },
            },
            { new: true } // This ensures that the updated user document is returned
        );
        

        // Save the updated user object
        await userDb.save();
        const updatedUser = await User.findById(userid).populate("LikedPlayList");
        console.log(updatedUser);
        return new Response(JSON.stringify({status:"success",message:"song added"}), {status:200})
      } else {
        return new Response(
          JSON.stringify({ status: "fail", messsage: "Not Authorized" }),
          {
            status: 401,
          }
        );
      }
    } else {
      return new Response(
        JSON.stringify({ status: "fail", message: "Not Authorized" }),
        {
          status: 401,
        }
      );
    }
  } catch (error) {}
}
