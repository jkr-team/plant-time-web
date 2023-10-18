import React, { useEffect, useState } from 'react';
import { ChatBubble } from './ChatBubble';
import { Chat } from './Chat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { ChatTypingIndicator } from './ChatTypingIndicator';
import { randomIntInRange } from '../utils/random';

export type FormStep = {
  id: string;
  prompt: string[];
  onSubmit: (value: string | number) => void;
  validate?: (value: string | number) => string; // Returns an error message if the input is invalid, or an empty string if the input is valid (runs every time the user types)
  asyncValidate?: (value: string | number) => Promise<string>; // An asynchronous validator that returns an error message if the input is invalid, or an empty string if the input is valid (only runs once the user submits this step)
};

type CompletedFormStep = {
  step: FormStep;
  value: string | number;
};

type ChatFormProps = {
  steps: FormStep[];
  onSubmit: () => void;
};

export const ChatFormHeader = () => (
  <div className='flex h-[3.5em] w-full items-center bg-zinc-100 p-2 text-xl text-black dark:bg-zinc-700 dark:text-white md:rounded-tl-3xl md:rounded-tr-3xl'>
    <img className='absolute w-[3em]' alt='Plant Time Logo' src='/logo.svg' />
    <span className='mx-auto'>Plant Time</span>
  </div>
);

export const ChatFormError = ({ error }: { error: string }) => (
  <div className='text-md absolute bottom-full left-0 w-full px-4 py-2 text-red-700 dark:text-red-400'>
    <FontAwesomeIcon icon={faCircleExclamation} className='mr-2' />
    <span>{error}</span>
  </div>
);

export const ChatFormInput = ({ onInput }: { onInput: (input: string) => void }) => (
  <input
    name='chat-form-input'
    className='relative flex flex-1 rounded-3xl border-2 border-black border-opacity-10 bg-transparent px-4 py-2 text-xl shadow-md dark:border-white dark:border-opacity-30'
    autoFocus={true}
    onInput={(e) => onInput((e.target as HTMLInputElement).value)}
  />
);

export const ChatFormSubmitButton = () => (
  <button
    className='w-12 cursor-pointer rounded-full border-2 border-black border-opacity-10 shadow-md dark:border-white dark:border-opacity-30'
    type='submit'
  >
    <FontAwesomeIcon icon={faPaperPlane} />
  </button>
);

export const ChatForm = ({ steps, onSubmit }: ChatFormProps) => {
  // The index of the current step
  const [step, setStep] = useState(0);

  // An array of completed steps and the value that was submitted by the user
  const [completedSteps, setCompletedSteps] = useState<CompletedFormStep[]>([]);

  // The index of the current line of the current step prompt
  const [line, setLine] = useState(0);

  // The error message to display to the user if their input is invalid
  const [error, setError] = useState<string>('');

  // A boolean indicating whether we are waiting for the async validation to complete
  const [isAsyncValidating, setIsAsyncValidating] = useState<boolean>(false);

  const currentStep = steps[step];

  const onSubmitStep = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // If the typing indicator is still typing, we have gone through the entire form, there is an error with the user's input, or an async validator is running, don't submit the step
    if (!currentStep || line < currentStep.prompt.length || error !== '' || isAsyncValidating) {
      return;
    }

    const formData = new FormData(e.target as HTMLFormElement);
    const value = Array.from(formData.values()).join(' ');

    if (currentStep.asyncValidate) {
      // Set the async validating flag to true so that the user cannot submit the form again
      setIsAsyncValidating(true);

      // Run the async validator
      const asyncError = await currentStep.asyncValidate(value);
      setIsAsyncValidating(false);

      // If there is an error, set the error message and return
      if (asyncError !== '') {
        setError(asyncError);
        return;
      }
    }

    // If we have reached this point, the user's input is valid, so submit the step and move on to the next step
    currentStep.onSubmit(value);
    setCompletedSteps([...completedSteps, { step: currentStep, value }]);

    // If we have run through all the steps, submit the form
    if (step + 1 >= steps.length) {
      onSubmit();
    }

    setStep(step + 1);
    setLine(0);
  };

  const onUserInput = (input: string) => {
    if (currentStep && currentStep.validate) {
      setError(currentStep.validate(input));
    }
  };

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (currentStep && line < currentStep.prompt.length) {
          setLine(line + 1);
        }
      },
      randomIntInRange(1000, 2000)
    );

    return () => clearTimeout(timeout);
  }, [line]);

  return (
    <div className='flex h-full w-full flex-1 flex-col'>
      <ChatFormHeader />

      <div className='w-full flex-1 bg-white p-4 dark:bg-zinc-900'>
        <Chat>
          {completedSteps.map(({ step, value }, index) => (
            <>
              {step.prompt.map((line, index) => (
                <ChatBubble key={index} type={'received'}>
                  {line}
                </ChatBubble>
              ))}

              <ChatBubble type={'sent'}>{value}</ChatBubble>
            </>
          ))}

          {currentStep && (
            <>
              {currentStep.prompt.slice(0, line).map((line, index) => (
                <ChatBubble key={index} type={'received'}>
                  {line}
                </ChatBubble>
              ))}
            </>
          )}

          {currentStep && line < currentStep.prompt.length && <ChatTypingIndicator />}
        </Chat>
      </div>

      <form
        className='relative flex w-full gap-2 bg-zinc-100 p-4 align-middle text-black shadow-md dark:bg-zinc-700 dark:text-white md:rounded-bl-3xl md:rounded-br-3xl'
        onSubmit={onSubmitStep}
      >
        {error && <ChatFormError error={error} />}
        <ChatFormInput onInput={onUserInput} />
        <ChatFormSubmitButton />
      </form>
    </div>
  );
};
