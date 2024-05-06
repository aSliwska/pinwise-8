import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Drone Detect",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          inter.className +
          " text-black bg-gradient-to-b from-white to-gray-100 min-h-screen"
        }
      >
        {children}
      </body>
    </html>
  );
}
