import React from 'react';
import classNames from 'classnames';
import ChatBubble, { TextBubbleProps } from './ChatBubble';
import { flattenReactFragments } from '../utils/flattenReactFragments';
import ChatTypingIndicator from './ChatTypingIndicator';

export interface ChatProps {
  children: React.ReactNode;
  key?: React.Key;
}

const Chat = ({ key, children }: ChatProps) => {
  const flattened = flattenReactFragments(children).filter(
    (child) => React.isValidElement(child) && (child.type === ChatBubble || child.type === ChatTypingIndicator)
  ) as React.ReactElement<TextBubbleProps>[];

  return (
    <div className='flex h-full w-full flex-col overflow-y-auto'>
      {React.Children.map(flattened, (child, index) => (
        <div
          key={key ?? index}
          className={classNames('flex w-3/4', {
            'ml-auto justify-end': child.props.type === 'sent',
            'mr-auto justify-start': child.props.type === 'received',
          })}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default Chat;
