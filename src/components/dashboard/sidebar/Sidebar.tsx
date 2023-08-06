"use client";
import Image from "next/image";
import Link from "next/link";
import { FC, useContext, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import logo from "../../../assets/logo.png";
import { Context } from "@/components/ContextProvider";
interface SidebarProps {}

const Sidebar: FC<SidebarProps> = ({}) => {
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

  const navsFooter = [
    {
      href: "javascript:void(0)",
      name: "Help",
      icon: (
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
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
          />
        </svg>
      ),
    },
    {
      href: "javascript:void(0)",
      name: "Settings",
      icon: (
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
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      href: "javascript:void(0)",
      name: "Logout",
      icon: (
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
        </svg>
      ),
    },
  ];
  const { isOpen } = useContext(Context);
  return (
    <>
      <nav
        className={`fixed top-0 duration-200 left-0 w-full overflow-x-hidden h-full md:pb-24 pb-36 border-r text-white bg-transparent space-y-8 md:w-[23rem] sm:w-80 lg:w-[30%]`}
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
              <ul className="px-4 py-2 text-sm font-medium overflow-auto">
                {navsFooter.map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={item.href}
                      className="flex items-center text-lg gap-x-2 text-white lg:py-2 lg:px-4 py-2 px-1 rounded-lg  hover:bg-slate-800 active:bg-gray-100 duration-150"
                    >
                      <div className="text-white">{item.icon}</div>
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
