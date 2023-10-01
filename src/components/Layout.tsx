import { useState } from "react";
import { Roboto_Condensed } from "next/font/google";
import { UserContext, type User } from "../contexts/user";

const robotoCondensed = Roboto_Condensed({ subsets: ["latin"], weight: ["300", "400", "700"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState({ location: { lat: NaN, lng: NaN }, desiredPlants: [] } as User);

  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      <div className={`flex-1 bg-green-200 ${robotoCondensed.className}`}>{children}</div>
    </UserContext.Provider>
  );
}
