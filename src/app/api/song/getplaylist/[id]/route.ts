import { authOptions } from "@/lib/authOptions";
import PlayList from "@/models/PlayList";
import User from "@/models/User";
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
        const userDb = await User.findById(userid).populate("playlist").exec();
        if (!userDb) {
          return new Response(
            JSON.stringify({ status: "fail", message: "User not found" }),
            {
              status: 400,
            }
          );
        }
        const playlistIndex = userDb.playlist.findIndex(
          (playlist: PlayListTypes) => playlist._id.toString() === id
        );
        if (playlistIndex === -1) {
          return new Response(
            JSON.stringify({ status: "fail", message: "Not Authorized" }),
            {
              status: 400,
            }
          );
        }

        const playListSongs = await PlayList.findById(id).populate({
         path:   "song",
         select:  "name url author poster_url"
        })
        return new Response(
            JSON.stringify(playListSongs), {status:200}
        )

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
  } catch (error) {
    return new Response(
        JSON.stringify({ status: "fail", messsage: "Internal Server Error" }),
        {
          status: 500,
        }
    )
  }
}
