import React from 'react';
import { DigitalClock } from './DigitalClock';

export const PhoneContainer = ({ children }: { children: React.ReactNode }) => (
  <div className='relative flex w-full flex-1 flex-col overflow-hidden shadow-2xl dark:shadow-xl md:max-h-[1200px] md:max-w-[568px] md:rounded-3xl'>
    <div className="flex py-2 px-4 items-center justify-between bg-zinc-100 text-lg dark:bg-zinc-800 z-20">
      <span>PLANTTIME</span>
      <DigitalClock />
    </div>
    <div className="flex flex-col w-full flex-1">{children}</div>
  </div>
);
