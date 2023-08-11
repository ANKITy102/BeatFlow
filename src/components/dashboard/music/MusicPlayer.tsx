"use client";
import Image from "next/image";
import { FC, useContext, useEffect, useRef, useState } from "react";
import logo from "../../../assets/music2.jpg";
import { Heart } from "lucide-react";
import { FcLike } from "react-icons/fc";
import { MdSkipPrevious } from "react-icons/md";
import { MdSkipNext } from "react-icons/md";
import { ImVolumeHigh } from "react-icons/im";
import { BsPlayCircleFill, BsPauseCircleFill } from "react-icons/bs";
import { Context } from "@/components/ContextProvider";
interface MusicPlayerProps {}

const MusicPlayer: FC<MusicPlayerProps> = ({}) => {
  const [isLiked, setLiked] = useState<boolean>(false);
  const musicPlayerRef= useRef<HTMLInputElement>(null);
  const changeColor = () => {
    setLiked((prev) => !prev);
  };
  
  /**************Volume Control************************************* */
  const { audioElement,setAudioElement, currentPlayingSongData ,audioPlaying, setAudioPlaying } = useContext(Context);
  // Inside your component
  const [volume, setVolume] = useState<number>(0.5); // Initial volume level (0.5 for example)
  // const [progressBar, setProgressBar] = useState<string>("50%");
  const playSong = () => {
    if(audioElement && audioElement.id!=="" && audioElement.paused){
      audioElement.play();
      setAudioPlaying(true);
    }
    else if(audioElement && audioElement.id!=="" && !audioElement.paused){
      audioElement.pause();
      setAudioPlaying(false);
    }
  };

  useEffect(()=>{
    if(audioElement && audioElement.id!==""){

      audioElement.ontimeupdate = ()=>{
        console.log("hi")
       let progress:  number = (audioElement.currentTime/audioElement.duration) * 10000;
       let setthisvalue: string= progress + "";
       if(musicPlayerRef && musicPlayerRef.current)
        musicPlayerRef.current.value=setthisvalue;
        // console.log(progress + "%");
        
      }
    }

  },[audioElement])
  
  // Event handler for volume change
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    audioElement.volume = newVolume; // Update the audio volume
  };
  const handleSlider = ()=>{
    if(musicPlayerRef && audioElement && musicPlayerRef.current && audioElement.id!==""){
      audioElement.currentTime = parseInt(musicPlayerRef.current.value) * audioElement.duration / 10000;

    }
  }

  return (
    <div className="fixed z-10 bottom-0 w-full flex-wrap text-white  bg-black a min-h-[6rem] flex  md:flex-row  justify-between  md:justify-around md:items-center">
      <div className="md:w-1/4 w-full px-4 space-x-3  h-full relative justify-between flex items-center">
        <div className="flex w-4/5 space-x-3 truncate items-center">

         {

          <Image height={60} width={50} src={  logo} alt="Music" />}
          <div className="truncate">
            <div className="truncate font-semibold w-full">{ currentPlayingSongData.name!==""? currentPlayingSongData.name:"Song Name"}</div>
            <div className="text-xs truncate text-zinc-400">{currentPlayingSongData.author!==""?currentPlayingSongData.author : "Author" }</div>
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
            {audioPlaying ? <BsPauseCircleFill className="hover:cursor-pointer" /> : <BsPlayCircleFill className="hover:cursor-pointer" />}
          </span>
          <MdSkipNext className="min-w-[2rem]" />
        </div>
        <div className="md:w-2/3 w-full md:px-0 px-4 mb-2">
          <input type="range" min="0" ref={musicPlayerRef}  onInput={handleSlider} max="10000"  className="w-full opacity-75 hover:opacity-100 h-1" />
        </div>
      </div>
      <div className="w-[30%] md:w-1/4 h-full flex md:justify-end md:p-8 mx-2 md:mx-0 md:items-end justify-center items-center">
        <div className="flex md:justify-end md:items-center pt-12 md:pt-0 justify-center items-center  md:px-0 w-full">
          <ImVolumeHigh className="text-xl" />

          {/* <input type="range" className="w-full md:w-1/2 h-1 md:mx-3    ml-3" /> */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            className="w-full opacity-75 hover:opacity-100 md:w-1/2 h-1 md:mx-3  ml-3"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
