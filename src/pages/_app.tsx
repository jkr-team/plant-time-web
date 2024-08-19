import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Roboto_Condensed } from 'next/font/google';
import { twJoin } from 'tailwind-merge';
import ThemeSwitch from '../components/ThemeSwitch';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { AnimatePresence } from 'framer-motion';
config.autoAddCss = false;

const robotoCondensed = Roboto_Condensed({ subsets: ['latin'], weight: ['300', '400', '700'] });

export default function App({ Component, pageProps, router }: AppProps) {
  const pathname = router.asPath;
  const wide = pageProps?.wide ?? false;

  return (
    <div className={`flex h-full w-full flex-col items-center justify-center ${robotoCondensed.className}`}>
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

          {pathname !== '/' && (
            <Link className='text-zinc-500' href='/' aria-label='Go Back Home'>
              <FontAwesomeIcon icon={faCircleLeft} />
            </Link>
          )}
        </div>

        <div className='relative flex w-full flex-1 flex-col items-center bg-white dark:bg-zinc-900'>
          <AnimatePresence mode='wait' initial={false}>
            <Component {...pageProps} key={router.asPath} />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
