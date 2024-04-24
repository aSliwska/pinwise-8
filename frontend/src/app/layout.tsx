import type { Metadata } from "next";
import { Inter, Amita } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const amita = Amita({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col h-screen w-screen">
          <div className="flex-none w-screen">
            <div className="flex w-screen h-12 px-3 justify-between items-center color-bg-gray-black color-border-black">
              
              <div className="flex flex-row w-52 justify-start gap-4">
                <Image
                  className="relative"
                  src="/back_arrow.svg"
                  alt="Side menu"
                  width={18}
                  height={18}
                  priority
                />
                <div className={"color-text-gray-light text-sm"}>Powrót do mapy</div>
              </div>
              
              <div className="flex flex-row gap-2 mt-2">
                <Image
                  className="relative"
                  src="/logo.svg"
                  alt="PinWise Logo"
                  width={28}
                  height={36}
                  priority
                />
                <div className={"text-xl leading-7 color-text-off-white " + amita.className}>Pinwise</div>
              </div>
              
              <div className="flex flex-row w-52 justify-end gap-2">
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
            </div>
          </div>
          
          <div className="flex flex-1 w-screen h-screen">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
