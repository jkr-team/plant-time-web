import React, { forwardRef, useEffect, useState } from 'react';
import ChatBubble from './ChatBubble';
import Chat from './Chat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faLeaf, faPaperPlane, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Logo from '../img/logo.svg';
import ChatTypingIndicator from './ChatTypingIndicator';
import { randomIntInRange } from '../utils/random';
import { useScrollToBottom } from '../utils/useScrollToBottom';

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
};

function ChatFormError({ error }: { error: string }) {
  return (
    <div className='w-full p-1 text-red-700 dark:text-red-400'>
      <FontAwesomeIcon icon={faCircleExclamation} className='mr-2' />
      <span>{error}</span>
    </div>
  );
}

const ChatFormInput = React.forwardRef(
  (props: React.HTMLProps<HTMLInputElement>, ref: React.LegacyRef<HTMLInputElement> | undefined) => (
    <input
      {...props}
      ref={ref}
      name='chat-form-input'
      className='relative flex flex-1 rounded-2xl border-2 border-black border-opacity-10 bg-transparent px-4 py-2 text-xl shadow-md invalid:border-red-700 focus:outline-none dark:border-white dark:border-opacity-30'
      autoFocus={true}
    />
  )
);

ChatFormInput.displayName = 'ChatFormInput';

function ChatFormSubmitButton() {
  return (
    <button
      title='Submit'
      className='flex w-12 cursor-pointer items-center justify-center rounded-full border-2 border-black border-opacity-10 text-green-800 shadow-md dark:border-white dark:border-opacity-30 dark:text-green-300'
      type='submit'
    >
      <FontAwesomeIcon icon={faPaperPlane} />
    </button>
  );
}
function ChatFormBGImage() {
  return (
    <div
      className='absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 text-green-600 opacity-10
   dark:text-green-300'
    >
      <Logo className='w-48' />
    </div>
  );
}

export default function ChatForm({ steps, onSubmit }: ChatFormProps) {
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

  const inputRef = React.useRef<HTMLInputElement>(null);
  const scrollContainerRef = useScrollToBottom<HTMLDivElement>();
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

    // Clear the error message from the previous step (if there was one)
    setError('');

    const submitError = await currentStep.onSubmit(value);

    // Validation is complete, so we can set the error message
    setError(submitError);

    // Set the error message on the input element as well
    if (inputRef.current) {
      inputRef.current.setCustomValidity(submitError);
      inputRef.current.checkValidity();
    }

    setIsValidating(false);

    // If the user's input is invalid, return and don't advance to the next step
    if (submitError !== '') {
      return;
    }

    // Otherwise, add the completed step to the array of completed steps
    const newCompletedSteps = [...completedSteps, { step: currentStep, value }];
    setCompletedSteps(newCompletedSteps);

    // If we have reached the end of the form, call the onSubmit callback
    if (newCompletedSteps.length === steps.length) {
      onSubmit();
      setStep(step + 1);
      setLine(0);
      return;
    }

    // Advance to the next step
    setStep(step + 1);
    setLine(0);

    // Clear the input
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (currentStep && line < currentStep.prompt.length) {
          setLine(line + 1);
        }
      },
      randomIntInRange(800, 1500)
    );

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [line]);

  return (
    <div className='flex w-full flex-1 flex-col'>
      <div className='relative flex w-full flex-1 flex-col px-4'>
        <ChatFormBGImage />

        <div
          className='relative z-10 w-full flex-1 basis-0 overflow-y-auto py-4 scrollbar-hide'
          ref={scrollContainerRef}
        >
          <Chat>
            {completedSteps.map(({ step, value }) => (
              <React.Fragment key={`${step.id}`}>
                {step.prompt.map((line, index) => (
                  <ChatBubble key={`${step.id} ${line} ${index}`} type={'received'}>
                    {line}
                  </ChatBubble>
                ))}

                <ChatBubble type={'sent'}>{value}</ChatBubble>
              </React.Fragment>
            ))}

            {currentStep && (
              <>
                {currentStep.prompt.slice(0, line).map((line, index) => (
                  <ChatBubble key={`${currentStep.id} ${line} ${index}`} type={'received'}>
                    {line}
                  </ChatBubble>
                ))}
              </>
            )}

            {currentStep && line < currentStep.prompt.length && <ChatTypingIndicator />}
          </Chat>
        </div>
      </div>

      {error && <ChatFormError error={error} />}

      <form
        className='relative flex w-full gap-4 bg-zinc-100 p-4 align-middle text-black shadow-md dark:bg-zinc-800 dark:text-white'
        onSubmit={onSubmitStep}
      >
        <div className='text-md absolute bottom-full left-0 flex w-full justify-between px-4 py-2 '>
          {isValidating && (
            <div className='animate-spin'>
              <FontAwesomeIcon icon={faSpinner} />
            </div>
          )}
        </div>
        <ChatFormInput
          ref={inputRef}
          onInput={(e) => {
            (e.target as HTMLInputElement).setCustomValidity('');
          }}
        />
        <ChatFormSubmitButton />
      </form>
    </div>
  );
}
