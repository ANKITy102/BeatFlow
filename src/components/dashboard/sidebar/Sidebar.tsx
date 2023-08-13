"use client";
import Image from "next/image";
import Link from "next/link";
import { FC, useContext, useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import logo from "../../../assets/logo.png";
import { Context } from "@/components/ContextProvider";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";
import { BiLoaderCircle } from "react-icons/bi";
import { Library } from 'lucide-react';
import getUserData from "@/lib/getUser";
import PlaylistSkeleton from "../music/PlaylistSkeleton";

interface SidebarProps {
  user:UserType
}

const Sidebar: FC<SidebarProps> = ({user}) => {
  const navigation = [
    {
      href: "/",
      name: "Home",
      icon: <AiFillHome className="text-white" />,
    },
    {
      href: "/search",
      name: "Search",
      icon: <FiSearch className="text-white" />,
    },
  ];

  const LogoutIcon = () =>{
    return (
      <svg
        
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
      />
    </svg >
    )
  }
  const { isOpen } = useContext(Context);
  const [isLoading , setLoading] = useState<boolean>(false);
  // console.log(user);
  const {setUser} = useContext(Context);
  
  const signOutUser =async ()=>{
    try {
      setLoading(true);
      await signOut();
      
    } catch (error) {
        toast.error("Something went wrong");
    }
    finally{
      setLoading(false);
    }
  }
  useEffect(()=>{
    setUser(user);
  },[])
  // console.log(user);
  return (
    <>
      <nav
        className={`fixed bg-black z-10 top-0 duration-200 left-0 w-full overflow-x-hidden h-full md:pb-24 pb-36 border-r text-white  space-y-8 md:w-[23rem] sm:w-80 lg:w-[30%]`}
        style={{
          width: isOpen ? "" : "0px",
          opacity: isOpen ? "" : "0.5",
        }}
      >
        <div className="flex flex-col h-full">
          <div className="h-14 flex items-center px-5">
            <Link href="/" className="flex justify-center items-center">
              <Image
                height={40}
                referrerPolicy="no-referrer"
                src={logo}
                alt="BeatFlow UI logo"
                className="inline"
              />
              <span className="text-white mx-3 text-xl">BeatFlow</span>
            </Link>
          </div>
          <div className="flex-1 flex flex-col p-3 h-full overflow-auto">
            <ul className="px-4 text-sm font-medium py-2 rounded-md bg-stone-900 mb-2 flex-1 h-fit">
              {navigation.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    className="flex text-white text-lg items-center gap-x-2 lg:py-2 lg:px-4 py-2 px-1 rounded-lg  hover:bg-slate-800 active:bg-gray-100 duration-150"
                  >
                    <div className="text-white">{item.icon}</div>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="rounded-md bg-stone-900 overflow-auto p-3 h-full">
              <div className="border-b flex gap-x-2 text-lg justify-between px-4 pb-1 text-gray-400 font-bold">
                <div className="flex">
              <Library /> Your Library

                </div>
                <div className="font-normal hover:cursor-pointer text-2xl">
                  +
                </div>
              </div>
              
              <ul className="px-1 py-2 text-sm font-medium overflow-auto">
                <PlaylistSkeleton name="Liked Songs" key="liked song" creator={`${user.LikedPlayList?.length} Songs`}/>
              
                <li key="logout">
                    <button
                    onClick={()=>{
                      signOutUser();
                    }}
                      className="w-full flex items-center text-lg gap-x-2 text-white lg:py-2 lg:px-4 py-2 px-1 rounded-lg  hover:bg-slate-800 active:bg-gray-600 duration-150"
                    >
                    <div className="text-white">{isLoading?<BiLoaderCircle className="m-auto h-4 w-4 animate-spin" /> : <LogoutIcon/>}</div>
                      Logout
                    </button>
                  </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
