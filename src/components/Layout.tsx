import { Roboto_Condensed } from "next/font/google";

const robotoCondensed = Roboto_Condensed({ subsets: ["latin"], weight: ["300", "400", "700"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={`flex-1 bg-green-200 ${robotoCondensed.className}`}>{children}</div>;
}
