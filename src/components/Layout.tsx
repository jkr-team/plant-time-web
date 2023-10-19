import React from 'react';
import { Roboto_Condensed } from 'next/font/google';
import classNames from 'classnames';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-1 flex-col bg-sky-day text-black transition-colors dark:bg-sky-night dark:text-white'>
      <main className='mx-auto flex w-full max-w-container flex-1 flex-col'>{children}</main>
    </div>
  );
}
