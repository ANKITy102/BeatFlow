interface PlayListTypes{
    _id: string
    user?: string
    name: string 
    creator: string
    song: [songtype]

}

interface PlayListTypes2{
    _id: string,
    name:string,
    creator:string,
    songlength?: number
}

interface LikedPlayListType{
    _id:string
}