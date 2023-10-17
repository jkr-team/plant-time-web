import React, { useEffect, useState } from 'react';
import { TextBubble } from './TextBubble';
import { Chat } from './Chat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { TypingIndicator } from './TypingIndicator';
import { random } from 'nanoid';
import { randomIntInRange } from '../utils/random';

export type FormStep = {
  id: string;
  prompt: string[];
  component: React.ReactNode;
  validate?: (value: string | number) => boolean;
};

type CompletedFormStep = {
  step: FormStep;
  value: string | number;
};

type ChatFormProps = {
  steps: FormStep[];
  onSubmit: () => void;
  disabled?: boolean;
};

export const ChatForm = ({ steps, onSubmit, disabled }: ChatFormProps) => {
  // The index of the current step
  const [step, setStep] = useState(0);

  // An array of completed steps and the value that was submitted by the user
  const [completedSteps, setCompletedSteps] = useState<CompletedFormStep[]>([]);

  // The index of the current line of the current step prompt
  const [line, setLine] = useState(0);

  // The error message to display to the user if their input is invalid
  const [error, setError] = useState<string>('');

  const currentStep = steps[step];

  useEffect(() => {
    const delay = randomIntInRange(1000, 3000);
    const timeout = setTimeout(() => {

      if (currentStep && line < currentStep.prompt.length) {
        setLine(line + 1);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [line]);

  return (
    <div className='flex flex-1 flex-col w-full h-full gap-2'>
      <div className='flex items-center justify-center w-full p-4 bg-green-600 text-white dark:bg-green-200 dark:text-black rounded-tr-3xl rounded-tl-3xl text-3xl'>
        Plant Time
      </div>

      <div className='flex-1 w-full p-4'>
        <Chat>
          {completedSteps.map(({ step, value }, index) => (
            <>
              {step.prompt.map((line, index) => (
                <TextBubble key={index} type={'received'}>
                  {line}
                </TextBubble>
              ))}

              <TextBubble type={'sent'}>{value}</TextBubble>
            </>
          ))}

          {currentStep && (
            <>
              {currentStep.prompt.slice(0, line).map((line, index) => (
                <TextBubble key={index} type={'received'}>
                  {line}
                </TextBubble>
              ))}
            </>
          )}

          {currentStep && line < currentStep.prompt.length && <TypingIndicator />}
        </Chat>
      </div>

      <form
        className='flex relative align-middle rounded-br-3xl dark:bg-zinc-700 rounded-bl-3xl w-full gap-2 p-4 shadow-md'
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const value = Array.from(formData.values()).join(' ');

          setCompletedSteps([...completedSteps, { step: currentStep, value }]);

          if (step + 1 >= steps.length) {
            onSubmit();
          }

          setStep(step + 1);
          setLine(0);
        }}
      >
        <div className='absolute px-4 bottom-full left-0 text-md text-red-700 w-full dark:text-red-400'>{error}</div>

        <div className="flex-1 relative flex rounded-3xl border-2 border-black border-opacity-10 text-xl py-2 px-4 shadow-md dark:border-white dark:border-opacity-30 before:content-['\200B'] before:block">
          {currentStep && (line >= currentStep.prompt.length) && currentStep.component}
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
