import React from 'react';
import classNames from 'classnames';

export interface TextBubbleProps {
  children: React.ReactNode;
  type: 'sent' | 'received';
};

export const TextBubble = ({ type, children }: TextBubbleProps) => {

  return <div className={classNames('flex rounded-3xl text-xl py-2 px-4 w-fit max-w-full shadow-md animate-fade-in', {
    'bg-blue-600 text-white dark:bg-blue-200 dark:text-black': type === 'sent',
    'bg-zinc-200 text-black dark:bg-zinc-800 dark:text-white': type === 'received',
  })}>{children}</div>;
};
