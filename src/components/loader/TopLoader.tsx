import React, { FC } from 'react'
import LoadingBar from 'react-top-loading-bar'

interface TopLoaderProps {
    progress: number,
    setProgress:React.Dispatch<React.SetStateAction<number>>,
  
}

const TopLoader: FC<TopLoaderProps> = ({progress, setProgress}) => {
  return  <LoadingBar
    
  color='#f11946'
  progress={progress}
  onLoaderFinished={() => setProgress(0)}
/>
}

export default TopLoader