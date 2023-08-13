import { Loader2Icon } from 'lucide-react'
import { FC } from 'react'

interface FullScreenLoaderProps {
  
}

const FullScreenLoader: FC<FullScreenLoaderProps> = ({}) => {
  return <div className="fixed z-50 bg-slate-500 opacity-40 h-full w-full pr-64 flex justify-center items-center text-2xl">
      <Loader2Icon className="text-4xl animate-spin h-24 w-24" />
</div>
}

export default FullScreenLoader