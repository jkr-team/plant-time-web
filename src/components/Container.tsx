import React from 'react';
import { twJoin } from 'tailwind-merge';

export interface ContainerProps {
  top: React.ReactNode;
  children: React.ReactNode;
  wide?: boolean;
}

export default function Container({ top, children, wide = false }: ContainerProps) {
  return (
    <div
      className={twJoin(
        'relative flex w-full flex-1 flex-col overflow-hidden shadow-2xl transition-max-width duration-700 dark:shadow-xl md:max-h-[1200px] md:rounded-3xl',
        wide ? 'md:max-w-screen-2xl' : 'md:max-w-screen-sm'
      )}
    >
      <div className='z-20 flex items-center bg-zinc-100 px-4 py-2 text-2xl dark:bg-zinc-800'>{top}</div>
      <div className='relative flex w-full flex-1 flex-col bg-white dark:bg-zinc-900'>{children}</div>
    </div>
  );
}
