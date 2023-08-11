"use client";
import { useState, createContext, useContext } from "react";
import { Toaster } from "react-hot-toast";
interface ContextProps {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  songs: songtype[];
  setSongs: React.Dispatch<React.SetStateAction<songtype[] | []>>;
  currentPlayingSongData: songtype;
  setCurrentPlayingSongData: React.Dispatch<React.SetStateAction<songtype>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;

  audioElement: any;
  setAudioElement: any;
  audioPlaying: boolean;
  setAudioPlaying: React.Dispatch<React.SetStateAction<boolean>>
}
export const Context = createContext<ContextProps>({
  user: { _id: "", name: "", email: "", password: "" },
  setUser: () => {},
  isOpen: false,
  setOpen: () => {},
  songs: [],
  setSongs: () => {},
  isLoading: false,
  setIsLoading: () => {},
  currentPlayingSongData: {
    author:"",
    poster_url: "",
    url:"",
    _id : "",
    name: ""
  },
  setCurrentPlayingSongData: ()=>{},
  audioElement: null,
  setAudioElement: () => {},
  audioPlaying: false,
  setAudioPlaying: ()=>{}

});

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const initialUser = {
    _id: "",
    name: "",
    email: "",
    password: "",
  };
  const initialSong = {
    author:"",
    poster_url: "",
    url:"",
    _id : "",
    name: ""
  }

  const [user, setUser] = useState<UserType>(initialUser);
  const [isOpen, setOpen] = useState<boolean>(true);
  const [songs, setSongs] = useState<songtype[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [audioPlaying, setAudioPlaying] = useState<boolean> (false);
  const [currentPlayingSongData, setCurrentPlayingSongData] = useState<songtype>(initialSong);
  /****************Play song*************************************************** */
  const initialAudio = {
    src: "",
    id: "",
  };
  const [audioElement, setAudioElement] = useState<any>(initialAudio);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        isOpen,
        setOpen,
        songs,
        setSongs,
        isLoading,
        setIsLoading,
        audioElement,
        setAudioElement,
        audioPlaying,
        setAudioPlaying,
        currentPlayingSongData,
        setCurrentPlayingSongData
      }}
    >
      {children}
      <Toaster position="top-right" reverseOrder={false} />
    </Context.Provider>
  );
};
