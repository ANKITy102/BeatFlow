import Image from 'next/image'
import { FC } from 'react'
import playListLogo from "../../../assets/likedplaylistlogo.png"
interface PlaylistSkeletonProps {
  name: string,
  creator: string  ,

}

const PlaylistSkeleton: FC<PlaylistSkeletonProps> = ({name, creator}) => {
    // console.log(user);
  return <li >
  <button

    className="w-full flex items-center h-16 text-left gap-x-2 text-white lg:py-1 lg:px-2 py-1 px-1 rounded-lg  hover:bg-slate-800 active:bg-gray-600 duration-150"
  >
  <div className="text-white h-full overflow-hidden rounded-sm flex items-center" >
    <Image 
    src={playListLogo}
    alt="playlist"
    className='h-12 w-12 rounded-lg'
    />
  </div>
    <div className="flex  flex-col justify-between gap-y-1 truncate">
        <div className=" truncate">
            {name}
        </div>
        <div className=" text-xs text-gray-500 truncate">
           PlayList . {creator}
        </div>
    </div>
  </button>
</li>
}

export default PlaylistSkeleton