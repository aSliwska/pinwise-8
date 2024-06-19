"use client";
import Link from "next/link";
import { Input, Button, ConfigProviderProps } from 'antd';

import { Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from "@/components/store";

import PinCardList from "./pinCardList";
import PinCard from 'components/PinCard';

import { fetchAllUserPins } from '../../../../logic/map/pinFetching';


export default function ProfilePage() {
  const [user, setUser] = useAtom(userAtom);

  const handleLogout = (_event: any) => {
    setUser((user) => ({ ...user, isAuthenticated: false })); 
    localStorage.removeItem('token');
  }

    return (
      <main className="flex min-h-full min-w-full flex-col items-center justify-between color-bg-gradient-light-gray overflow-hidden">
        <div className="flex min-h-full justify-center color-bg-gradient-dark-gray w-4/6 min-w-[500px]">
          <div className="pl-10 flex min-h-full w-9/12 min-w-[500px] flex-col">
          <div className="p-4 pt-10 text-5xl font-bold items-left">Mój profil</div>
          <div className="mu-10 h-full flexitems-center justify-center">
          <div className="container mx-auto p-4 w-full">
        <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex-initial">
                <h2 className="text-xl mb-6">User</h2>
            <div className="h-full">
                <ul className="space-y-0">
                    <li><a href="/profile/pins" className="px-3 flex items-center h-[3rem] text-center border-y-2 border-[#4a4a4a] hover:bg-[#4a4a4a] active:bg-gray-600/50">Moje pineski</a></li>
                    <li><a href="/profile/data" className="px-3 flex items-center h-[3rem] text-center border-b-2 border-[#4a4a4a] hover:bg-[#4a4a4a] active:bg-gray-600/50">Moje dane osobowe</a></li>
                    <li><a href="/profile/settings" className="px-3 flex items-center h-[3rem] text-center border-b-2 border-[#4a4a4a] hover:bg-[#4a4a4a] active:bg-gray-600/50">Ustawienia</a></li>
                    <li><a href="/map" onClick={handleLogout} className="px-3 flex items-center h-[3rem] text-center border-b-2 border-[#4a4a4a] hover:bg-[#4a4a4a] active:bg-gray-600/50">Wyloguj</a></li>
                </ul>
                </div>
            </div>

            <div className="flex-auto">
                <h2 className="text-xl">Moje pineski</h2>
                
                <PinCardList />

            </div>
        </div>
    </div>
            {/* <div className="grid grid-cols-2 gap-1 p-1">
              <div className="text-white p-6 rounded-lg">Item 1</div>
              <div className="text-white p-6 rounded-lg">Item 2</div>
              <div className="text-white p-6 rounded-lg">Item 3</div>
              <div className="text-white p-6 rounded-lg">Item 4</div>
            </div>
            <form style={{ minWidth: "60%" }}>
              <div className="flex flex-col justify-between gap-12 p-4 rounded-lg text-white">
                
    
                <div className="w-full">
                  <div className="w-full mb-6">
                    <div className="flex justify-between w-full mb-4">
                      <label htmlFor="email" className="text-neutral-300 font-light">
                        Email
                      </label>
                    </div>
                    <Input id="email" type="email" autoFocus={true}/>
                  </div>
                  <div className="self-stretch">
                    <div className="flex justify-between w-full mb-4">
                      <label htmlFor="password" className="text-neutral-300 font-light">
                        Hasło
                      </label>
                      <Link
                        href="/forgot-password"
                        className="font-semibold color-text-teal justify-between"
                      >
                        Zapomniałem/am hasła
                      </Link>
                    </div>
                    <Input id="password" type="password"/>
                  </div>
                </div>
    
                <Button type="primary" size="large" htmlType="submit" block style={{fontWeight: 700}}>
                  Zaloguj
                </Button> */}
              {/* </div>
            </form> */}
          </div>
          </div>
        </div>
      </main>
    );
  }
  