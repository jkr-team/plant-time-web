import React from 'react';
import { ChatBubble } from './ChatBubble';

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
