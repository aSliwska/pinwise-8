"use client";

import { Provider, atom } from "jotai";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  username: string;
  sub: string;
}

const token = localStorage.getItem("token");

let decodedToken: DecodedToken | null = null;
if (token) {
  decodedToken = jwtDecode<DecodedToken>(token);
}

export const userAtom = atom({
  isAuthenticated: token ? true : false,
  email: decodedToken ? decodedToken.sub : "",
  name: decodedToken ? decodedToken.username : "",
});

export const isMapSidemenuOpenAtom = atom(false);
export const isServicesSearchOpenAtom = atom(false);

export const showUserPinsOnMapAtom = atom(false);
export const showExistingLocationsOnMapAtom = atom(false);
export const showHeatmapAtom = atom(false);
export const timePeriodForPinDisplayAtom = atom('-1');

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider>{children}</Provider>;
}
