"use client";

import { Provider, atom } from "jotai";

export const userAtom = atom({
  isAuthenticated: localStorage.getItem("token") ? true : false,
  id: 0,
  name: "TestUser",
});

export const isMapSidemenuOpenAtom = atom(false);

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider>{children}</Provider>;
}
