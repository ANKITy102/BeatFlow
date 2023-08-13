"use client";

import { Context } from "@/components/ContextProvider";
import { useContext, useEffect, useState } from "react";
import LoadingBar from 'react-top-loading-bar'
import { toast } from "react-hot-toast";
import MiniMusicPlayer from "./MiniMusicPlayer";
import TopLoader from "@/components/loader/TopLoader";
export default () => {
  const { songs, setSongs, isLoading, setIsLoading } = useContext(Context);
  const [progress, setProgress] = useState<number>(0);


  useEffect(() => {
    const fun = async () => {
      try {
        setProgress(30);
        setIsLoading(true);
        const getsongs = await fetch("/api/song/getsong");
        setProgress(50);
        const ddd = await getsongs.json();
        setProgress(70);
        if (ddd?.status === "fail") {
          const message = ddd?.messsage
            ? ddd.message
            : "Unable to get the songs";
          return toast.error(message);
        }
        // console.log(ddd);
        setSongs(ddd);
        setProgress(90);
      } catch (error) {
        toast.error("Unable to get the songs");
      } finally {
        setIsLoading(false);
        setProgress(100);
      }
    };
    fun();
  }, []);

  return (
    <div className="fixed right-0 bg-black    top-0 md:pb-24 lg:w-[70%] pb-36 md:w-[63%] sm:w-80 w-full z-0 overflow-auto mx-auto px-4 md:px-8">
      <div className="mt-12  relative shadow-sm  rounded-lg ">
       <TopLoader progress={progress} setProgress={setProgress}/>
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b ">
            <tr>
              <th className="py-3 px-6">#</th>
              <th className="py-3 px-6">Title</th>
              <th className="py-3 px-6">Author</th>
              <th className="py-3 px-6">Duration</th>
              <th className="py-3 px-6"></th>
              <th className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody className="text-gray-200 ">
            
            {songs.map((item, idx) => (
              <MiniMusicPlayer item={item} key={item._id} idx={idx} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
