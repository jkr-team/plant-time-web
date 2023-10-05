import { Typewriter } from "../components/Typewriter";
import { useEffect, useState } from "react";

export default function Home() {
  const prompts = ["Welcome to Plant Time!", "What's your location?", "What plants do you want to grow?"];
  const [prompt, setPrompt] = useState(0);

  return (
    <main className="flex flex-col">
      {prompts.map((value, index) => {
        if (index < prompt) {
          return <span key={value} className="text-7xl p-6">{value}</span>;
        }
      }).filter((value) => value)}
      <Typewriter
        value={prompts[prompt]}
        key={prompts[prompt]}
        timing={75}
        className="text-7xl p-6"
        onCompleted={() => {
          setPrompt(Math.min(prompt + 1, prompts.length - 1));
        }}
      />
    </main>
  );
}
