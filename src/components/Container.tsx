import React from 'react';
import DigitalClock from './DigitalClock';
import classNames from 'classnames';

export default function Container({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <div
      className={classNames(
        'relative flex w-full flex-1 flex-col overflow-hidden shadow-2xl transition-max-width duration-700 dark:shadow-xl md:max-h-[1200px] md:rounded-3xl',
        { 'md:max-w-[1440px]': wide, 'md:max-w-[568px]': !wide }
      )}
    >
      <div className='z-20 flex items-center justify-between bg-zinc-100 px-4 py-2 text-lg dark:bg-zinc-800'>
        <span>PLANTTIME</span>
        <DigitalClock />
      </div>
      <div className='flex w-full flex-1 flex-col bg-white dark:bg-zinc-900'>{children}</div>
    </div>
  );
}
