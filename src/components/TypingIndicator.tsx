import React from 'react';
import { TextBubble } from './TextBubble';

export const TypingIndicator = () => {
  return (
    <TextBubble type={'received'}>
      <div className='flex items-center gap-2 select-none'>
        <div className='animate-dim'>●</div>
        <div className='animate-dim animation-delay-100'>●</div>
        <div className='animate-dim animation-delay-200'>●</div>
      </div>
    </TextBubble>
  );
};
