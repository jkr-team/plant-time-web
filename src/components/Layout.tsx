import React, { useEffect, useState } from 'react';
import { Roboto_Condensed } from 'next/font/google';
import classNames from 'classnames';
import { useTime } from '../hooks/useTime';
import { ThemeSwitch } from './ThemeSwitch';
import { Theme, ThemeContext } from '../contexts/theme';

const robotoCondensed = Roboto_Condensed({ subsets: ['latin'], weight: ['300', '400', '700'] });

export default function Layout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={classNames('flex flex-1 flex-col', theme)}>
        <div
          className={classNames(
            'bg-sky-day dark:bg-sky-night flex flex-1 flex-col text-black transition-colors dark:text-white',
            robotoCondensed.className
          )}
        >
          <div className='fixed right-0 top-0 p-4'>
            <ThemeSwitch />
          </div>
          <main className='mx-auto flex w-full max-w-container flex-1 flex-col'>{children}</main>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
