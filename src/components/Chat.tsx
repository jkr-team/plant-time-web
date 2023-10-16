import React, { ReactElement } from 'react';
import classNames from 'classnames';
import { TextBubble, TextBubbleProps } from './TextBubble';
import { flattenReactFragments } from '../utils/flattenReactFragments';

export interface ChatProps {
  children: ReactElement<TextBubbleProps>[] | ReactElement<TextBubbleProps>;
  key?: React.Key;
}

export const Chat = ({ key, children }: ChatProps) => {
  const flattened = flattenReactFragments(children).filter(
    (child) => React.isValidElement(child) && child.type === TextBubble
  ) as ReactElement<TextBubbleProps>[];

  return (
    <div className='flex flex-col gap-2 w-full h-full overflow-y-auto'>
      {React.Children.map(flattened, (child, index) => (
        <div
          key={key ?? index}
          className={classNames('flex w-3/4', {
            'justify-end ml-auto': child.props.type === 'sent',
            'justify-start mr-auto': child.props.type === 'received',
          })}
        >
          {child}
        </div>
      ))}
    </div>
  );
};
