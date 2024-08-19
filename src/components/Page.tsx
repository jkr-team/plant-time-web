import React, { createContext, useState } from 'react';
import { twJoin } from 'tailwind-merge';
import ThemeSwitch from './ThemeSwitch';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';

export interface PageProps {
  children?: React.ReactNode;
}

export type PageContextValue = {
  setWide?: React.Dispatch<React.SetStateAction<boolean>>;
};

const PageContext: React.Context<PageContextValue> = createContext({});

export const Page = ({ children }: PageProps) => {
  const { pathname } = useRouter();
  const [wide, setWide] = useState(false);

  return (
    <PageContext.Provider
      value={{
        setWide: setWide,
      }}
    >
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

        <div className='relative flex w-full flex-1 flex-col items-center bg-white dark:bg-zinc-900'>{children}</div>
      </div>
    </PageContext.Provider>
  );
};
