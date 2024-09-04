import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import React from 'react';

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body className='bg-sky-day text-black transition-[background-color] duration-700 dark:bg-zinc-950 dark:text-white'>
        <Main />
        <NextScript />
        <Script strategy='beforeInteractive' src='/theme.js' />
      </body>
    </Html>
  );
}
