"use client";

import { Context } from "@/components/ContextProvider";
import { useContext, useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "react-hot-toast";
import MiniMusicPlayer from "./MiniMusicPlayer";
export default () => {
  const { songs, setSongs, isLoading, setIsLoading } = useContext(Context);

  const [isLiked, setLiked] = useState<boolean>(false);

  const changeColor = () => {
    setLiked((prev) => !prev);
  };

  useEffect(() => {
    const fun = async () => {
      try {
        setIsLoading(true);
        const getsongs = await fetch("/api/song/getsong");

        const ddd = await getsongs.json();
        if (ddd?.status === "fail") {
          const message = ddd?.messsage
            ? ddd.message
            : "Unable to get the songs";
          return toast.error(message);
        }
        console.log(ddd);
        setSongs(ddd);
      } catch (error) {
        toast.error("Unable to get the songs");
      } finally {
        setIsLoading(false);
      }
    };
    fun();
  }, []);

  return (
    <div className="fixed right-0 h-full overflow-auto top-0 md:pb-24 lg:w-[70%] pb-36 md:w-[63%] sm:w-80 w-full z-0  mx-auto px-4 md:px-8">
      <div className="mt-12 shadow-sm border rounded-lg overflow-auto">
        <table className="w-full table-auto text-sm text-left h-full overflow-auto">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b overflow-auto">
            <tr>
              <th className="py-3 px-6">#</th>
              <th className="py-3 px-6">Title</th>
              <th className="py-3 px-6">Author</th>
              <th className="py-3 px-6">Duration</th>
              <th className="py-3 px-6"></th>
              <th className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody className="text-gray-200 divide-y overflow-auto">
            {songs.map((item, idx) => (
              <MiniMusicPlayer item={item} idx={idx} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
