import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-1 flex-col bg-sky-day text-black transition-colors duration-700 dark:bg-sky-night dark:text-white'>
      <main className='flex w-full flex-1 flex-col'>{children}</main>
    </div>
  );
}
