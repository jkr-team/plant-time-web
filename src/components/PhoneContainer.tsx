import React from 'react';
import DigitalClock from './DigitalClock';

export default function PhoneContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative flex w-full flex-1 flex-col overflow-hidden shadow-2xl dark:shadow-xl md:max-h-[1200px] md:max-w-[568px] md:rounded-3xl'>
      <div className='z-20 flex items-center justify-between bg-zinc-100 px-4 py-2 text-lg dark:bg-zinc-800'>
        <span>PLANTTIME</span>
        <DigitalClock />
      </div>
      <div className='flex w-full flex-1 flex-col'>{children}</div>
    </div>
  );
}
