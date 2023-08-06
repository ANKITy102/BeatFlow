"use client";
import { useState, createContext, useContext } from "react";
import { Toaster } from "react-hot-toast";
interface ContextProps {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
  isOpen: boolean;
  setOpen:  React.Dispatch<React.SetStateAction<boolean>>;
}
export const Context = createContext<ContextProps>({
  user: {_id:"" ,name: "", email: "", password: "" },
  setUser: () => {},
  isOpen: false,
  setOpen: ()=> {}
  

});

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const initialUser = {
    _id:"",
    name: "",
    email: "",
    password: "",
  };
  const [user, setUser] = useState<UserType>(initialUser);
  const [isOpen, setOpen] = useState<boolean>(false);
  return (
    <Context.Provider
      value={{
        user,
        setUser,
        isOpen,
        setOpen
      }}
    >
      {children}
      <Toaster position="top-right" reverseOrder={false} />
    </Context.Provider>
  );
};
