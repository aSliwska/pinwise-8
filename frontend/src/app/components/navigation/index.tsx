"use client";

import { useState } from "react";
import { usePathname } from 'next/navigation';
import TopBar from "./topbar";
import SideMenu from "./sidemenu";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const pathname = usePathname();

  return (
    <>
      <div className="flex-none w-screen z-10">
        <TopBar toggle={toggle}/>
      </div>
      
      {(pathname.substring(0, 4) == "/map") && <SideMenu isOpen={isOpen}/>}
    </>
  );
};
