"use client";
import Link from "next/link";
import { Input, Button, ConfigProviderProps } from 'antd';

import { Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import PinPopupContent from '@/components/map/pin';
import { useCallback, useMemo, useRef, useState } from 'react';

import { Select } from "antd";

interface PersonalDataPanelProps {
  setAge: (age: string) => void;
  setMode: (mode: string) => void;
  setGender: (gender: string) => void;
  handleSubmit: () => void;
  setEducation: (education: string) => void;
}

export default function ProfilePage() {
    return (
      <main className="flex min-h-full min-w-full flex-col items-center justify-between color-bg-gradient-light-gray">
        <div className="flex min-h-full justify-center color-bg-gradient-dark-gray w-4/6 min-w-[500px]">
          <div className="pl-10 flex min-h-full w-9/12 min-w-[500px] flex-col">
          <div className="p-4 pt-10 text-5xl font-bold items-left">Mój profil</div>
          <div className="mu-10 h-full flexitems-center justify-center">
          <div className="container mx-auto p-4 w-full">
        <div className="grid grid-cols-2 gap-4 w-full">
            <div className="">
                <h2 className="text-xl mb-6">User</h2>
            <div className="h-full">
                <ul className="space-y-0">
                    <li><a href="/profile/pins" className="px-3 flex items-center h-[3rem] text-center border-y-2 border-[#4a4a4a] hover:bg-[#4a4a4a] active:bg-gray-600/50">Moje pineski</a></li>
                    <li><a href="/profile/data" className="px-3 flex items-center h-[3rem] text-center border-b-2 border-[#4a4a4a] hover:bg-[#4a4a4a] active:bg-gray-600/50">Moje dane osobowe</a></li>
                    <li><a href="/profile/settings" className="px-3 flex items-center h-[3rem] text-center border-b-2 border-[#4a4a4a] hover:bg-[#4a4a4a] active:bg-gray-600/50">Ustawienia</a></li>
                    <li><a href="#" className="px-3 flex items-center h-[3rem] text-center border-b-2 border-[#4a4a4a] hover:bg-[#4a4a4a] active:bg-gray-600/50">Wyloguj</a></li>
                </ul>
                </div>
            </div>

            <div className="">
                <h2 className="text-xl">Moje dane osobowe</h2>
                <p className="mb-6 text-[#666666] text-sm">Dodaj swoje dane, aby inwestorzy mieli lepsze pojęcie o swoich potencjalnych klientach.</p>
                <ul className="space-y-2 border-t-2 border-[#404040]">

                  <form>
                    <div className="flex flex-col items-center justify-between gap-12 rounded-lg text-white">

                      <table className="text-xl w-full">
                        <tbody>
                          <tr className="table-row-gap">
                            <td>Płeć</td>
                            <td>
                              <Select
                                className="w-full"
                                onChange={(value) => /*setGender(value)*/{}}
                                defaultValue={"Wybierz"}
                              >
                                <Select.Option value="Kobieta">Kobieta</Select.Option>
                                <Select.Option value="Mężczyzna">Mężczyzna</Select.Option>
                                <Select.Option value="Inna">Inna</Select.Option>
                              </Select>
                            </td>
                          </tr>
                          <tr className="table-row-gap">
                            <td>Wiek</td>
                            <td>
                              <Select
                                className="w-full"
                                onChange={(value) => /*setAge(value)*/{}}
                                defaultValue={"Wybierz"}
                              >
                                <Select.Option value={"18-"}>&lt; 18</Select.Option>
                                <Select.Option value="18-30">18-25</Select.Option>
                                <Select.Option value="30-40">26-31</Select.Option>
                                <Select.Option value="40-50">32-47</Select.Option>
                                <Select.Option value="50-60">48-61</Select.Option>
                                <Select.Option value="60+">&gt; 62</Select.Option>
                              </Select>
                            </td>
                          </tr>
                          <tr>
                            <td>Edukacja</td>
                            <td className="items-right">
                              <Select
                                className="w-full"
                                onChange={(value) => /*setEducation(value)*/{}}
                                defaultValue={"Wybierz"}
                              >
                                <Select.Option value="Podstawowe">Podstawowe</Select.Option>
                                <Select.Option value="Średnie">Średnie</Select.Option>
                                <Select.Option value="Wyższe">Wyższe</Select.Option>
                                <Select.Option value="Inne">Inne</Select.Option>
                              </Select>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <Button
                        type="primary"
                        size="small"
                        block
                        style={{ fontWeight: 700 }}
                        onClick={(e) => {
                          e.preventDefault();
                          //handleSubmit();
                        }}
                      >
                        Zmień dane
                      </Button>
                    </div>
                  </form>
                </ul>
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
  