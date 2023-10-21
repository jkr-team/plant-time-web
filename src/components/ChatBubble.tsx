import React from 'react';
import classNames from 'classnames';

export interface TextBubbleProps {
  children: React.ReactNode;
  type: 'sent' | 'received';
}

const ChatBubble = ({ type, children }: TextBubbleProps) => {
  return (
    <div
      className={classNames('m-1.5 flex w-fit max-w-full rounded-3xl px-4 py-2 text-xl shadow-md', {
        'bg-zinc-200 text-black dark:bg-zinc-700 dark:text-white': type === 'received',
        'bg-blue-500 text-white dark:bg-blue-600': type === 'sent',
      })}
    >
      {children}
    </div>
  );
};

export default ChatBubble;
