"use client";
import { useState, createContext, useContext } from "react";
import { Toaster } from "react-hot-toast";
interface ContextProps {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
}
export const Context = createContext<ContextProps>({
  user: {_id:"" ,name: "", email: "", password: "" },
  setUser: () => {},
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
  return (
    <Context.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
      <Toaster position="top-right" reverseOrder={false} />
    </Context.Provider>
  );
};
