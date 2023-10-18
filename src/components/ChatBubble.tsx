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
          'bg-green-600 text-white dark:bg-green-200 dark:text-black': type === 'received',
          'bg-zinc-100 text-black dark:bg-zinc-600 dark:text-white': type === 'sent',
        }
      )}
    >
      {children}
    </div>
  );
};
