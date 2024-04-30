import type { Metadata } from "next";
import { Inter, Amita } from "next/font/google";
import "./globals.css";
import Navigation from "./components/navigation";
import { ConfigProvider, Tabs } from 'antd';

const inter = Inter({ subsets: ["latin"] });
const amita = Amita({ weight: "400", subsets: ["latin"] });

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
    <ConfigProvider direction="ltr" 
    theme={{
      token: {
        colorPrimary: "#4CCAAE",
        fontFamily: inter.style.fontFamily,
        fontSize: 16,
        borderRadius: 8,
      },
      components :{
        Tabs: {
          colorText: '#e5e5e5',
          colorPrimaryHover: '#A3A3A3',
          lineWidthBold: 3,
          colorBorderSecondary: '#A3A3A3',
        }
      }
    }}>
      <html lang="en">
        <body className={inter.className}>
          <div className="flex flex-col h-screen w-screen max-h-screen">

            <Navigation/>
            
            <div className="flex flex-1 w-screen h-screen">
              {children}
            </div>

          </div>
        </body>
      </html>
    </ConfigProvider>
  );
}
