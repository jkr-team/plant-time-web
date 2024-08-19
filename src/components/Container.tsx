import React from 'react';
import { twJoin } from 'tailwind-merge';
import ThemeSwitch from './ThemeSwitch';

export interface ContainerProps {
  top?: React.ReactNode;
  children?: React.ReactNode;
  wide?: boolean;
}

export const Container = ({ top, children, wide = false }: ContainerProps) => {
  return (
    <div
      className={twJoin(
        'relative m-auto flex h-full w-full flex-col overflow-hidden shadow-2xl transition-[aspect-ratio] duration-700 dark:shadow-xl',
        wide
          ? 'md:max-h-[min(95%,1080px)] md:max-w-[95%] md:rounded-3xl xl:aspect-[16/9] xl:h-[95vh] xl:w-auto'
          : 'md:aspect-[9/16] md:h-[95vh] md:max-h-[1080px] md:w-auto md:rounded-3xl'
      )}
    >
      <div className='z-20 flex min-h-[48px] items-center justify-between gap-4 bg-zinc-100 px-4 py-2 text-2xl dark:bg-zinc-800'>
        <ThemeSwitch />
        {top}
      </div>
      <div className='relative flex w-full flex-1 flex-col items-center bg-white dark:bg-zinc-900'>{children}</div>
    </div>
  );
}
