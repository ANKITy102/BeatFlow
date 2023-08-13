"use client";
import { Context } from "@/components/ContextProvider";
import { Heart } from "lucide-react";
import { FC, useContext, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import { BiLoaderCircle } from "react-icons/bi";
import PlayingGig from "../../../assets/playing.gif";
import Image from "next/image";
import { toast } from "react-hot-toast";
interface MiniMusicPlayerProps {
  item: songtype;
  idx: number;
  // key: string;
}
interface GetResponse{
  message:string,
  status: string,
}

const MiniMusicPlayer: FC<MiniMusicPlayerProps> = ({ item, idx }) => {
  const [isLiked, setLiked] = useState<boolean>(false);
  const { audioElement, setAudioElement, audioPlaying, setAudioPlaying, setCurrentPlayingSongData } = useContext(Context);
  const [songDuration, setDuration] = useState<string>("00:00");
  const thisAudioDuration = new Audio(item.url);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  thisAudioDuration.id = item._id;
  thisAudioDuration.onloadedmetadata = () => {
    const durationInSeconds = thisAudioDuration.duration;
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    const setthis = `${formattedMinutes}:${formattedSeconds}`;
    setDuration(setthis);
    setIsLoading(false);
  };
  const changeColor = async() => {
    const addLikedSong = await fetch(`/api/song/likesong/${item._id}`,{
      method: "GET",
     
    })
    const result = await addLikedSong.json() as GetResponse;
    if(!result){
      return toast.error("Something Went wrong. please try again");
    }
    if(result.status==="fail"){
      return toast.error("Something went wrong.")
    }
    setLiked((prev) => !prev);
  };
  const startSong = (song: songtype) => {
    if (
      audioElement &&
      audioElement.id !== "" &&
      audioElement.id === song._id &&
      !audioElement.paused
    ) {
      audioElement.pause();
      setAudioPlaying(false);
      return;
    } else if (
      audioElement &&
      audioElement.id !== "" &&
      audioElement.id === song._id &&
      audioElement.paused
    ) {
      audioElement.play();
      setCurrentPlayingSongData(song);
      setAudioPlaying(true);
      return;
    }
    if (audioElement && audioElement.id !== "" && audioPlaying) {
      audioElement.pause();
    }

    // console.log(audioElement.duration)
    setAudioElement(thisAudioDuration);
    thisAudioDuration.play();
    setCurrentPlayingSongData(song);
    setAudioPlaying(true);
  };

  /********************************************************************************************* */
  return (
    <tr
     
      className="overflow-auto group  hover:bg-slate-800 hover:cursor-pointer"
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="min-w-[22px] group-hover:hidden inline-block">
          {idx + 1}
        </div>
        <div
          className="hidden min-w-[22px] group-hover:inline-block text-lg"
          onClick={() => startSong(item)}
        >
          {item._id == audioElement.id && audioPlaying ? (
            <BsPauseFill />
          ) : (
            <BsPlayFill />
          )}
        </div>
      </td>
      <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
        <img src={item.poster_url} className="w-10 h-10 rounded-sm" />
        <div>
          <span className="block truncate max-w-sm text-gray-200 text-sm font-medium">
            {item.name}{" "}
            {item._id == audioElement.id && audioPlaying && (
              <div className="mx-2 inline-block relative w-5">
                <Image
                  src={PlayingGig}
                  className="inline"
                  alt="Playing"
                  width={20}
                  height={20}
                />
              </div>
            )}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{item.author}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        {isLoading ? (
          <BiLoaderCircle className="m-auto h-4 w-4 animate-spin" />
        ) : (
          <span className="m-auto">{songDuration}</span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {isLiked ? (
          <FcLike className="text-green-800 text-2xl" onClick={changeColor} />
        ) : (
          <Heart className="text-green-400 text-2xl" onClick={changeColor} />
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap ">...</td>
    </tr>
  );
};

export default MiniMusicPlayer;
