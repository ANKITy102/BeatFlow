import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { FC } from "react";
import { notFound } from "next/navigation";
import MusicPlayer from "@/components/dashboard/music/MusicPlayer";
import MusicTable from "@/components/dashboard/music/MusicTable";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";

import HamburgerIcon from "@/components/dashboard/Hamburger";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const session = await getServerSession(authOptions);
  if (!session) return notFound();
  return (
    <div className="w-screen h-screen bg-black">
      <Sidebar />
      <HamburgerIcon />
      <MusicTable />
      <MusicPlayer />
    </div>
  );
};

export default page;
