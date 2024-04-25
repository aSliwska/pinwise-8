"use client";

import Image from "next/image";
import Link from "next/link";
import { Amita } from "next/font/google";
import { usePathname } from 'next/navigation';
import { useState } from "react";

const amita = Amita({ weight: "400", subsets: ["latin"] });

export default function TopBar (props: { toggle: () => void; }) {
  const [user, setUser] = useState({
    isAuthenticated: true,
    name: "DummyUser",
    id: 0
  }); // TODO: fetch real user

  const pathname = usePathname();

  return (
    <div className="flex w-screen h-12 px-5 justify-between items-center color-bg-gray-black color-border-black">
      
      <div className="flex flex-grow basis-0"> 
        {((pathname != "/") && (pathname != "/heatmap")) ? (
          <Link 
            href="/"
            className="flex flex-row justify-start gap-4"
            >
            <Image
              className="relative"
              src="/back_arrow.svg"
              alt="Back to map"
              width={18}
              height={18}
              priority
            />
            <div className={"color-text-gray-light text-sm"}>Powrót do mapy</div>
          </Link>
        ) : (
          <button type="button" onClick={props.toggle} className="flex flex-row justify-start">
            <Image
              className="relative"
              src="/burger_menu.svg"
              alt="Side menu"
              width={18}
              height={13}
              priority
            />
          </button>
        )}
        
      </div>
      
      <Link 
        href="/"
        className="flex flex-row gap-2 mt-2 ml-auto mr-auto"
      >
        <Image
          className="relative"
          src="/logo.svg"
          alt="PinWise Logo"
          width={28}
          height={36}
          priority
        />
        <div className={"text-xl leading-7 color-text-off-white " + amita.className}>Pinwise</div>
      </Link>
      
      <div className="flex flex-row flex-grow basis-0">
        {user.isAuthenticated ? ( 
          <div className="flex flex-row justify-end items-center w-full gap-2">
            <span className="color-text-gray-light">
              Witaj, {user.name}!
            </span>
            <Link 
              href={`/profile/${user.id}`}
              className="px-3 py-2 text-sm color-text-off-white rounded-lg color-border-off-white"
            >
              Mój profil
            </Link>
          </div>
        ) : (
          <div className="flex flex-row justify-end items-center gap-2">
            <Link 
              href="/login"
              className="px-3 py-2 text-sm color-text-off-white rounded-lg color-border-off-white"
            >
              Logowanie
            </Link>

            <Link
              href="/register"
              className="px-3 py-2 text-sm font-semibold text-white rounded-lg color-bg-teal"
            >
              Rejestracja
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
