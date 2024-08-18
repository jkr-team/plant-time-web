import React from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

export interface ChatMessage {
  content: string;
  type: 'sent' | 'received';
  key?: React.Key;
}

export interface ChatProps {
  messages: ChatMessage[];
  isTyping?: boolean;
}

export interface ChatBubbleProps {
  children: React.ReactNode;
  type: 'sent' | 'received';
}

export const ChatBubble = ({ type, children }: ChatBubbleProps) => {
  return (
    <div
      className={twMerge(
        'm-1.5 flex w-fit max-w-full rounded-3xl px-4 py-2 text-xl shadow-md',
        type === 'received' && 'bg-zinc-200 text-black dark:bg-zinc-700 dark:text-white',
        type === 'sent' && 'bg-blue-500 text-white dark:bg-blue-600'
      )}
    >
      {children}
    </div>
  );
};

export const ChatTypingIndicator = () => {
  return (
    <ChatBubble type={'received'}>
      <div className='flex select-none items-center gap-1'>
        <span className='animate-dim'>●</span>
        <span className='animate-dim delay-100'>●</span>
        <span className='animate-dim delay-300'>●</span>
      </div>
    </ChatBubble>
  );
};

export const Chat = ({ messages, isTyping }: ChatProps) => {
  return (
    <div className='flex h-full w-full flex-col overflow-y-auto'>
      {messages.map((message, index) => (
        <div
          key={message.key || index}
          className={twJoin(
            'flex w-3/4',
            message.type === 'sent' && 'ml-auto justify-end',
            message.type === 'received' && 'mr-auto justify-start'
          )}
        >
          <ChatBubble type={message.type}>{message.content}</ChatBubble>
        </div>
      ))}

      {isTyping && <ChatTypingIndicator />}
    </div>
  );
};

export default Chat;
