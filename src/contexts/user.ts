import { createContext } from "react";

export type User = {
  location: { lat: number; lng: number };
  soilType: string;
  soilPH: number;
};

export type UserContextValue = {
  user: User;
  updateLocation: (lat: number, lng: number) => void;
  updateSoilType: (soilType: string) => void;
  updateSoilPH: (soilPH: number) => void;
};

export const UserContext = createContext({} as UserContextValue);
