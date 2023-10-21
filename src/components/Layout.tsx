import React from 'react';
import { Roboto_Condensed } from 'next/font/google';
import classNames from 'classnames';
import Script from 'next/script';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-1 flex-col bg-sky-day text-black transition-colors dark:bg-sky-night dark:text-white'>
      <main className='flex w-full flex-1 flex-col'>{children}</main>
      <Script strategy='beforeInteractive' src='/theme.js' />
    </div>
  );
}
