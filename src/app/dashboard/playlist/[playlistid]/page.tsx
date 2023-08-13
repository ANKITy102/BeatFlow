"use client"
import { useParams } from 'next/navigation'
import { FC } from 'react'

interface pageProps {
  
}

const page: FC<pageProps> = ({}) => {
    const id = useParams();
    console.log(id);
  return <div>page</div>
}

export default page