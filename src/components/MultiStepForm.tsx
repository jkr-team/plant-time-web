import React, { useEffect, useState } from 'react';
import { TextBubble } from './TextBubble';
import { Chat } from './Chat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export type FormStep = {
  id: string;
  prompt: string[];
  component: React.ReactNode;
  validate?: (value: string | number) => boolean;
};

type CompletedFormStep = {
  id: string;
  prompt: string[];
  value: string | number;
};

type MultiStepFormProps = {
  steps: FormStep[];
  onSubmit: () => void;
  disabled?: boolean;
};

export const MultiStepForm = ({ steps, onSubmit, disabled }: MultiStepFormProps) => {
  const [step, setStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<CompletedFormStep[]>([]);
  const [error, setError] = useState<string>('');

  return (
    <div className='flex flex-1 flex-col w-full h-full gap-2'>
      <div className='flex items-center justify-center w-full p-4 bg-green-600 text-white dark:bg-green-200 dark:text-black rounded-tr-3xl rounded-tl-3xl text-3xl'>
        Plant Time
      </div>

      <div className='flex-1 w-full p-4'>
        <Chat>
          {completedSteps.map(({ id, prompt, value }, index) => (
            <>
              {prompt.map((promptLine, index) => (
                <TextBubble key={index} type={'received'}>
                  {promptLine}
                </TextBubble>
              ))}

              <TextBubble type={'sent'}>{value}</TextBubble>
            </>
          ))}

          {steps[step] && (
            <>
              {steps[step].prompt.map((promptLine, index) => (
                <TextBubble key={index} type={'received'}>
                  {promptLine}
                </TextBubble>
              ))}
            </>
          )}
        </Chat>
      </div>

      <form
        className='flex relative align-middle w-full gap-2 p-4 shadow-md'
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const value = Array.from(formData.values()).join(' ');

          setCompletedSteps([...completedSteps, { id: steps[step].id, prompt: steps[step].prompt, value }]);

          if (step + 1 >= steps.length) {
            onSubmit();
          }

          setStep(step + 1);
        }}
      >
        <div className='absolute px-4 bottom-full left-0 text-md text-red-700 w-full dark:text-red-400'>{error}</div>

        <div className="flex-1 relative flex rounded-3xl border-2 border-black border-opacity-10 text-xl py-2 px-4 shadow-md dark:border-white dark:border-opacity-30 before:content-['\200B'] before:block">
          {steps[step] && steps[step].component}
        </div>

        <button
          className='w-12 border-2 border-black border-opacity-10 shadow-md rounded-full cursor-pointer dark:border-white dark:border-opacity-30'
          disabled={disabled || step >= steps.length}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  );
};
