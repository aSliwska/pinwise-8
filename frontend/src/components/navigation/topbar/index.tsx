"use client";

import { isMapSidemenuOpenAtom, userAtom } from "@/components/store";
import { ArrowLeftOutlined, MenuOutlined, PoweroffOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useAtom } from "jotai";
import { Amita } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const amita = Amita({ 
  weight: "400", 
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
 });

export default function TopBar() {
  const [user, setUser] = useAtom(userAtom);
  const [isMapSidemenuOpen, setIsMapSidemenuOpen] = useAtom(
    isMapSidemenuOpenAtom
  );
  const toggleMapSidemenuOpen = () => {
    setIsMapSidemenuOpen(!isMapSidemenuOpen);
  };
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex w-screen h-12 pr-5 pl-2 justify-between items-center bg-[#2E2E2E] border-[#282828] border-b">
      <div className="flex flex-grow basis-0 h-full justify-start items-center">
        {pathname.substring(0, 4) != "/map" ? (
          <Link href="/map" className="flex flex-row gap-4">
            <ArrowLeftOutlined style={{ color: "#d4d4d4", fontSize: 20 }} />
            <div className={"text-neutral-400 text-sm"}>Powrót do mapy</div>
          </Link>
        ) : (
          <div className="flex flex-row h-full items-center">
            <Button
              type="text"
              onClick={toggleMapSidemenuOpen}
            >
              <MenuOutlined style={{ color: "#d4d4d4", fontSize: 22 }} />
            </Button>
            <Button
              type="text"
              onClick={() => {
                localStorage.removeItem("finishedTour");
              }}
              href="/map"
            >
              <QuestionCircleOutlined size={20} style={{ color: "#d4d4d4", fontSize: 22 }} />
            </Button>
          </div>
        )}
      </div>

      <Link href="/map" className="flex flex-row gap-2 mt-2 ml-auto mr-auto">
        <Image
          className="relative"
          src="/logo.svg"
          alt="PinWise Logo"
          width={28}
          height={36}
          priority
        />
        <div
          className={"text-xl leading-7 text-neutral-200 " + amita.className}
        >
          Pinwise
        </div>
      </Link>

      <div className="flex flex-row flex-grow basis-0">
        {user.isAuthenticated === true ? (
          <div className="flex flex-row justify-end items-center w-full gap-2">
            <span className="text-neutral-400 text-sm">
              Witaj, {user.name}!
            </span>
            <Button ghost href={`/profile/${user.email}`}>
              Mój profil
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setUser((user) => ({ ...user, isAuthenticated: false }));
                localStorage.removeItem("token");
              }}
              className="flex flex-row items-center"
            >
              <PoweroffOutlined />
            </Button>
          </div>
        ) : (
          <div className="flex flex-row flex-grow basis-0 justify-end items-center gap-2">
            <Button ghost href="/login">
              Logowanie
            </Button>

            <Button type="primary" href="/register" style={{ fontWeight: 600 }}>
              Rejestracja
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
