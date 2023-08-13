import { authOptions } from "@/lib/authOptions";
import PlayList from "@/models/PlayList";
import User from "@/models/User";
import { connectDB } from "@/utils/connectDB";
import { getServerSession } from "next-auth";

export async function POST(req:Request) {
  try {
    const session = await getServerSession(authOptions);
    if (session) {
      if (session?.user) {
        await connectDB();
        const id:string = session.user.id;
        const body:{name:string} =await req.json();
        console.log(body);
        const {name}:{name:string} = body;
        if(!name){
            return new Response(JSON.stringify({ status: "fail", messsage:"Playlist name is required" }), {
                status: 400,
              });
        }
        
        const newPlaylist = await PlayList.create({
            user:id,
            name:name,
            creator: session.user.name
        });
        const getUser = await User.findByIdAndUpdate(id,{
            $push: {
                playlist: newPlaylist
            }
        }) 
        
        if(!getUser){
            return new Response(JSON.stringify({ status: "fail", messsage:"User not found" }), {
                status: 400,
              });
        }
        return new Response(JSON.stringify({ status: "success", messsage:"Playlist saved successfully." }), {
            status: 200,
          });
       
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
