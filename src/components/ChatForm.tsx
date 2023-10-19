import React, { useEffect, useState } from 'react';
import { ChatBubble } from './ChatBubble';
import { Chat } from './Chat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faLeaf, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { ChatTypingIndicator } from './ChatTypingIndicator';
import { randomIntInRange } from '../utils/random';

export type FormStep = {
  id: string;
  prompt: string[];
  // Callback for when the user submits this step, return a promise that resolves to a string, if the string is empty, the user will advance to the next step, otherwise the string will be treated as an error message that will be displayed to the user.
  onSubmit: (value: string) => Promise<string>;
};

type CompletedFormStep = {
  step: FormStep;
  value: string | number;
};

type ChatFormProps = {
  steps: FormStep[];
  onSubmit: () => void;
  submittedMessage: string;
};

export const ChatFormError = ({ error }: { error: string }) => (
  <div className='text-md absolute bottom-full left-0 w-full px-4 py-2 text-red-700 dark:text-red-400'>
    <FontAwesomeIcon icon={faCircleExclamation} className='mr-2' />
    <span>{error}</span>
  </div>
);

export const ChatFormInput = () => (
  <input
    name='chat-form-input'
    className='relative flex flex-1 rounded-3xl border-2 border-black border-opacity-10 bg-transparent px-4 py-2 text-xl shadow-md dark:border-white dark:border-opacity-30'
    autoFocus={true}
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

export const ChatFormBGImage = () => (
  <div
    className='absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 text-9xl text-green-600 opacity-10
   dark:text-zinc-500'
  >
    <FontAwesomeIcon icon={faLeaf} />
  </div>
);

export const ChatForm = ({ steps, onSubmit, submittedMessage }: ChatFormProps) => {
  // The index of the current step
  const [step, setStep] = useState(0);

  // An array of completed steps and the value that was submitted by the user
  const [completedSteps, setCompletedSteps] = useState<CompletedFormStep[]>([]);

  // The index of the current line of the current step prompt
  const [line, setLine] = useState(0);

  // The error message to display to the user if their input is invalid
  const [error, setError] = useState<string>('');

  // A boolean indicating whether we are waiting for the async validation to complete
  const [isValidating, setIsValidating] = useState<boolean>(false);

  // A boolean indicating whether we should show the submitted message
  const [showSubmittedMessage, setShowSubmittedMessage] = useState<boolean>(false);

  const currentStep = steps[step];

  const onSubmitStep = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // If the typing indicator is still typing, we have gone through the entire form, or the user's input is still being validated, don't submit the step
    if (!currentStep || line < currentStep.prompt.length || isValidating) {
      return;
    }

    const formData = new FormData(e.target as HTMLFormElement);
    const value = Array.from(formData.values()).join(' ');

    // The user has submitted the step, but we need to wait for the onSubmit callback to validate their input before advancing to the next step
    setIsValidating(true);

    const submitError = await currentStep.onSubmit(value);

    // Validation is complete, so we can set the error message
    setError(submitError);
    setIsValidating(false);

    // If the user's input is invalid, return and don't advance to the next step
    if (submitError !== '') {
      return;
    }

    // Otherwise, add the completed step to the array of completed steps
    setCompletedSteps([...completedSteps, { step: currentStep, value }]);

    // Advance to the next step
    setStep(step + 1);
    setLine(0);
  };

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (currentStep && line < currentStep.prompt.length) {
          setLine(line + 1);
        }

        // If we have reached the end of the form, show the submitted message and submit the form
        if (completedSteps.length === steps.length) {
          setShowSubmittedMessage(true);
          onSubmit();
        }
      },
      randomIntInRange(1000, 2000)
    );

    return () => clearTimeout(timeout);
  }, [line]);

  return (
    <div className='flex w-full flex-1 flex-col'>
      <div className='relative flex w-full flex-1 flex-col bg-white px-4 dark:bg-zinc-900'>
        <ChatFormBGImage />

        <div className='relative z-10 w-full flex-1 basis-0 overflow-y-auto py-4'>
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

            {((!showSubmittedMessage && completedSteps.length === steps.length) ||
              (currentStep && line < currentStep.prompt.length)) && <ChatTypingIndicator />}

            {showSubmittedMessage && <ChatBubble type={'received'}>{submittedMessage}</ChatBubble>}
          </Chat>
        </div>
      </div>

      <form
        className='relative flex w-full gap-2 bg-zinc-100 p-4 align-middle text-black shadow-md dark:bg-zinc-800 dark:text-white'
        onSubmit={onSubmitStep}
      >
        {error && <ChatFormError error={error} />}
        <ChatFormInput />
        <ChatFormSubmitButton />
      </form>
    </div>
  );
};
