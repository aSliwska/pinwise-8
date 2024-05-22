"use client";

import Image from "next/image";
import Link from "next/link";
import { Amita } from "next/font/google";
import { usePathname } from "next/navigation";
import { useAtomValue, useAtom } from "jotai";
import { isMapSidemenuOpenAtom, userAtom } from "@/components/store";
import { MenuOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import RequireLogin from "@/components/RequireLogin";
import useRequireLogin from "@/components/RequireLogin";
import { useRouter } from "next/navigation";

const amita = Amita({ weight: "400", subsets: ["latin"] });

export default function TopBar() {
  const user = useAtomValue(userAtom);
  const [isMapSidemenuOpen, setIsMapSidemenuOpen] = useAtom(
    isMapSidemenuOpenAtom
  );
  const toggleMapSidemenuOpen = () => {
    setIsMapSidemenuOpen(!isMapSidemenuOpen);
  };
  const pathname = usePathname();
  const { authorized, setAuthorized } = useRequireLogin();
  const router = useRouter();

  return (
    <div className="flex w-screen h-12 px-5 justify-between items-center bg-[#2E2E2E] border-[#282828] border-b">
      <div className="flex flex-grow basis-0">
        {pathname.substring(0, 4) != "/map" ? (
          <Link href="/map" className="flex flex-row justify-start gap-4">
            <ArrowLeftOutlined style={{ color: "#d4d4d4", fontSize: 20 }} />
            <div className={"text-neutral-400 text-sm"}>Powrót do mapy</div>
          </Link>
        ) : (
          <button
            type="button"
            onClick={toggleMapSidemenuOpen}
            className="flex flex-row justify-start"
          >
            <MenuOutlined style={{ color: "#d4d4d4", fontSize: 20 }} />
          </button>
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
        {user.isAuthenticated ? (
          <div className="flex flex-row justify-end items-center w-full gap-2">
            <span className="text-neutral-400 text-sm">
              Witaj, {user.name}!
            </span>
            <Button ghost href={`/profile/${user.id}`}>
              Mój profil
            </Button>{" "}
            {authorized ? (
              <Button
                type="primary"
                style={{ fontWeight: 600 }}
                onClick={() => {
                  localStorage.removeItem("token");
                  // router.push("/login");
                  setAuthorized(false);
                }}
              >
                Wyloguj
              </Button>
            ) : (
              <Button
                type="primary"
                style={{ fontWeight: 600 }}
                onClick={() => router.push("/login")}
              >
                Zaloguj
              </Button>
            )}
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
