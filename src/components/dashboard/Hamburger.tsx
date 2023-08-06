"use client";

import { FC, useContext, useState } from "react";

import { Squash as Hamburger } from "hamburger-react";
import { Context } from "../ContextProvider";
interface HamburgerProps {}

const HamburgerIcon: FC<HamburgerProps> = ({}) => {
    const {isOpen, setOpen} = useContext(Context);
    const sidebarHandler = () => {
        setOpen((prev) => !prev);
    }
  return (
    <div className="fixed right-1 top-1 sm:hidden block">
      <Hamburger
        color="white"
        toggled={isOpen}
        toggle={sidebarHandler}
        size={26}
      />
    </div>
  );
};

export default HamburgerIcon;
