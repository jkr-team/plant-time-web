import React, { createContext } from "react";

export type User = {
  location: { lat: number; lng: number };
  desiredPlants: string[];
};

type UserContextValue = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export const UserContext = createContext({} as UserContextValue);
