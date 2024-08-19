import React, { useEffect, useState } from 'react';
import { Chat } from './Chat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faLeaf, faPaperPlane, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { LogoBackground } from './LogoBackground';

export interface FormControl {
  id: string;
  messages: string[];
  type: 'text' | 'select' | 'number';
  // Function used to validate user input (unnecessary for select type)
  validator?: (value: string) => Promise<boolean>;
}

export interface FormProps {
  controls: FormControl[];
  onSubmit?: () => void;
}

export default function Form({ controls, onSubmit }: FormProps) {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  return (
    <div className='relative flex max-h-full w-full flex-1 flex-col'>
      <LogoBackground />

      <Chat messages={messages} isTyping={isTyping} />

      {/* Text Box */}
      <div className='flex gap-2 bg-zinc-100 p-4 dark:bg-zinc-800'>
        <div className='relative flex min-h-[40px] flex-1 rounded-2xl border border-black border-opacity-10 bg-transparent bg-white px-4 py-2 text-xl shadow-md invalid:border-red-700 focus:outline-none dark:border-white dark:border-opacity-30 dark:bg-zinc-900 [&:has(:focus-visible)]:ring-2'>
          <input className="focus:outline-none w-full bg-transparent" />
        </div>

        <button
          title='Submit'
          className='flex w-12 cursor-pointer items-center justify-center rounded-full border border-black border-opacity-10 bg-white text-green-600 shadow-md dark:border-white dark:border-opacity-30 dark:bg-zinc-900 dark:text-green-300'
          type='submit'
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
}
