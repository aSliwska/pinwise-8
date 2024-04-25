"use client";

import { useState } from "react";
import TopBar from "./topbar";
import SideMenu from "./sidemenu";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex-none w-screen">
        <TopBar toggle={toggle}/>
      </div>
      
      <SideMenu isOpen={isOpen} toggle={toggle} />
    </>
    
  );
};
