import { Typewriter } from "../components/Typewriter";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Typewriter value="Hello World!" timing={100} className="text-7xl p-6"/>
    </main>
  );
}
