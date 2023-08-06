"use client";
import Image from "next/image";
import { FC, useState } from "react";
import logo from "../../../assets/music2.jpg";
import { Heart } from "lucide-react";
import { FcLike } from "react-icons/fc";
import { MdSkipPrevious } from "react-icons/md";
import { MdSkipNext } from "react-icons/md";
import { ImVolumeHigh } from "react-icons/im";
import { BsPlayCircleFill, BsPauseCircleFill } from "react-icons/bs";
interface MusicPlayerProps {}

const MusicPlayer: FC<MusicPlayerProps> = ({}) => {
  const [isLiked, setLiked] = useState<boolean>(false);
  const [isPlaying, setPlaying] = useState<boolean>(false);
  const changeColor = () => {
    setLiked((prev) => !prev);
  };
  const playSong = () => {
    setPlaying((prev) => !prev);
  };
  return (
    <div className="fixed bottom-0 w-full flex-wrap text-white  bg-black a min-h-[6rem] flex  md:flex-row  justify-between  md:justify-around md:items-center">
      <div className="md:w-1/4 w-full px-4 space-x-3  h-full relative justify-between flex items-center">
        <div className="flex w-4/5 space-x-3 truncate items-center">
          <Image height={60} src={logo} alt="Music" />
          <div className="truncate">
            <div className="truncate font-semibold w-full">Believer</div>
            <div className="text-xs truncate text-zinc-400">Image Dragons</div>
          </div>
        </div>
        {isLiked ? (
          <FcLike className="text-green-800 text-2xl" onClick={changeColor} />
        ) : (
          <Heart className="text-green-400 text-2xl" onClick={changeColor} />
        )}
      </div>
      <div className="md:w-2/4 w-[65%] my-3 md:my-0 h-full items-center justify-end flex flex-col">
        <div className="flex w-1/3 text-4xl gap-5 justify-around items-center">
          <MdSkipPrevious className="min-w-[2rem]" />
          <span onClick={playSong}>
            {isPlaying ? <BsPauseCircleFill /> : <BsPlayCircleFill />}
          </span>
          <MdSkipNext className="min-w-[2rem]" />
        </div>
        <div className="md:w-2/3 w-full md:px-0 px-4 mb-2">
          <input type="range" className="w-full h-1" />
        </div>
      </div>
      <div className="w-[30%] md:w-1/4 h-full flex md:justify-end md:p-8 mx-2 md:mx-0 md:items-end justify-center items-center">
        <div className="flex md:justify-end md:items-center pt-12 md:pt-0 justify-center items-center  md:px-0 w-full">
          <ImVolumeHigh className="text-xl" />

          <input type="range" className="w-full md:w-1/2 h-1 md:mx-3    ml-3" />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
