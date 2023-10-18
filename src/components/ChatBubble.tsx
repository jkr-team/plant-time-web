import React from 'react';
import classNames from 'classnames';

export interface TextBubbleProps {
  children: React.ReactNode;
  type: 'sent' | 'received';
}

export const ChatBubble = ({ type, children }: TextBubbleProps) => {
  return (
    <div
      className={classNames(
        "flex rounded-3xl text-xl py-2 px-4 m-1.5 w-fit max-w-full shadow-md before:content-['\\200B'] before:block",
        {
          'text-black bg-zinc-200 dark:bg-zinc-700 dark:text-white': type === 'received',
          'text-white bg-blue-500 dark:bg-blue-600': type === 'sent',
        }
      )}
    >
      {children}
    </div>
  );
};
