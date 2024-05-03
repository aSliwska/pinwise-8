import type { Metadata } from "next";
import { Inter, Amita } from "next/font/google";
import "./globals.css";
import Navigation from "./components/navigation";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import ThemeProvider from "./components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PinWise",
  description: "Pokaż biznesom, gdzie potrzebujesz ich usług. PinWise pozwala wskazać mieszkańcom, gdzie dokładnie w ich mieście brakuje lokali różnych firm albo usług danego typu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider font={inter}>
          <AntdRegistry>
            <div className="flex flex-col h-screen w-screen max-h-screen">
              <Navigation/>
              
              <div className="flex flex-1 w-screen h-screen">
                {children}
              </div>
            </div>
          </AntdRegistry>
        </ThemeProvider>
      </body>
    </html>
  );
}
