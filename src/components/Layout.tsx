import { useState } from "react";
import { Roboto_Condensed, Roboto_Mono } from "next/font/google";
import { UserContext, type User } from "../contexts/user";

const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: "variable" });

export default function Layout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState({ location: { lat: NaN, lng: NaN }, desiredPlants: [] } as User);

  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      <div className={`flex-1 bg-green-200 ${robotoMono.className}`}>{children}</div>
    </UserContext.Provider>
  );
}
