import React from 'react';
import classNames from 'classnames';

export interface TextBubbleProps {
  children: React.ReactNode;
  type: 'sent' | 'received';
};

export const TextBubble = ({ type, children }: TextBubbleProps) => {

  return <div className={classNames('flex rounded-3xl text-xl py-2 px-4 m-1.5 w-fit max-w-full shadow-md', {
    'bg-green-600 text-white dark:bg-green-200 dark:text-black': type === 'received',
    'bg-zinc-100 text-black dark:bg-zinc-800 dark:text-white': type === 'sent',
  })}>{children}</div>;
};
