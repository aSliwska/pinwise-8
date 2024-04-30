"use client";

import Image from "next/image";
import Link from "next/link";
import { Amita } from "next/font/google";
import { usePathname } from 'next/navigation';
import { useState } from "react";
import { MenuOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const amita = Amita({ weight: "400", subsets: ["latin"] });

export default function TopBar (props: { toggle: () => void; }) {
  const [user, setUser] = useState({
    isAuthenticated: true,
    name: "DummyUser",
    id: 0
  }); // TODO: fetch real user

  const pathname = usePathname();

  return ( // todo: heatmap link might differ
    <div className="flex w-screen h-12 px-5 justify-between items-center bg-[#2E2E2E] border-[#282828] border-b">
      
      <div className="flex flex-grow basis-0"> 
        {(pathname != "/") ? (
          <Link 
            href="/"
            className="flex flex-row justify-start gap-4"
            >
            <ArrowLeftOutlined 
              className="text-neutral-300 text-xl"
            />
            <div className={"text-neutral-400 text-sm"}>Powrót do mapy</div>
          </Link>
        ) : (
          <button type="button" onClick={props.toggle} className="flex flex-row justify-start">
            <MenuOutlined
              className=" text-neutral-300 text-xl"
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
        <div className={"text-xl leading-7 text-neutral-200 " + amita.className}>Pinwise</div>
      </Link>
      
      <div className="flex flex-row flex-grow basis-0">
        {user.isAuthenticated ? ( 
          <div className="flex flex-row justify-end items-center w-full gap-2">
            <span className="text-neutral-400">
              Witaj, {user.name}!
            </span>
              <Link 
                href={`/profile/${user.id}`}
                className="px-3 py-2 text-sm text-neutral-300 rounded-lg border-neutral-300 border hover:bg-neutral-700 transition-all"
              >
                Mój profil
              </Link>
          </div>
        ) : (
          <div className="flex flex-row justify-end items-center gap-2">
            <Link 
              href="/login"
              className="px-3 py-2 text-sm text-neutral-300 rounded-lg border-neutral-300 border hover:bg-neutral-700 transition-all"
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
