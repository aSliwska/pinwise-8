"use client";

import { Provider, atom } from "jotai";

export const userAtom = atom({
  isAuthenticated: localStorage.getItem("token") ? true : false,
  email: "test@test.com",
  name: "TestUser",
}); // todo: user should probably be saved in localStorage... unless we fetch them on each refresh

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
