import MusicPlayer from "@/components/dashboard/music/MusicPlayer";
import PlayListForm from "@/components/dashboard/playlist/PlayListForm";

import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";




const Layout= async ({
    children
}:{
    children:React.ReactNode;
}) => {

    const session = await getServerSession(authOptions);
    if (!session) return notFound();
    const user = session.user;

  return (
    <div className="w-screen h-screen bg-black">
      <Sidebar user={user}/>
       
        {children}
      <MusicPlayer />
    </div>
  )
}

export default Layout