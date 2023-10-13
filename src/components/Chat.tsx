import React, { ReactElement } from 'react';
import classNames from 'classnames';
import { TextBubbleProps } from './TextBubble';

export interface ChatProps {
  children: ReactElement<TextBubbleProps>[];
}

export const Chat = ({ children }: ChatProps) => {
  return (
    <div className='flex flex-col gap-2 w-full h-full overflow-y-auto'>
      {children.map((child, index) => (
        <div
          key={index}
          className={classNames('flex w-3/4', {
            'ml-auto': child.props.type === 'sent',
            'mr-auto': child.props.type === 'received',
          })}
        >
          {child}
        </div>
      ))}
    </div>
  );
};
