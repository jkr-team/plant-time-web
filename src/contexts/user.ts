import React, { createContext } from "react";

export type User = {
  location: { lat: number; lng: number };
  soilType: string;
  soilPH: number;
};

type UserContextValue = {
  user: User;
  updateLocation: (lat: number, lng: number) => void;
  updateSoilType: (soilType: string) => void;
  updateSoilPH: (soilPH: number) => void;
};

export const UserContext = createContext({} as UserContextValue);
