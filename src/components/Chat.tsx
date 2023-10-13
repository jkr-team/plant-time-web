import React, { ReactElement } from 'react';
import classNames from 'classnames';
import { TextBubbleProps } from './TextBubble';

export interface ChatProps {
  children: ReactElement<TextBubbleProps>[];
  key?: React.Key;
}

export const Chat = ({ key, children }: ChatProps) => {
  return (
    <div className='flex flex-col gap-2 w-full h-full overflow-y-auto'>
      {children.map((child, index) => (
        <div
          key={key ?? index}
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
