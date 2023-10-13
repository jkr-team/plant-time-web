import React from 'react';
import { TextBubble } from './TextBubble';

export const TypingIndicator = () => {
  return (
    <TextBubble type={'received'}>
      <div className='flex items-center gap-1 select-none'>
        <span className='animate-dim'>●</span>
        <span className='animate-dim animation-delay-100'>●</span>
        <span className='animate-dim animation-delay-200'>●</span>
      </div>
    </TextBubble>
  );
};
