import React, { useEffect } from 'react'

type Prompt = {
  id: string;
  text: string;
  render: (props: { onComplete: () => void }) => React.ReactNode;
};

const Scene = ({ prompts, onAllComplete }: { prompts: Prompt[]; onAllComplete: () => void }) => {
  const [prompt, setPrompt] = React.useState(0);

  useEffect(() => {
    if (prompt === prompts.length) {
      onAllComplete();
    }
  }, [prompt]);

  return (
    <main className='flex flex-col'>
      {prompts.map((prompt, index) => {
        return prompt.render({ onComplete: () => setPrompt(index + 1) });
      })}
    </main>
  );
};
