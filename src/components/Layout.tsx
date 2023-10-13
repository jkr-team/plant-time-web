import React, { useEffect } from 'react';
import { useState } from 'react';
import { Roboto_Condensed } from 'next/font/google';
import { Theme, ThemeContext } from '../contexts/theme';
import { UserContext, type User } from '../contexts/user';
import classNames from 'classnames';
import { useMediaQuery } from '../hooks/useMediaQuery';

const robotoCondensed = Roboto_Condensed({ subsets: ['latin'], weight: ['300', '400', '700'] });

export default function Layout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('light' as Theme);

  useEffect(() => {
    // Set theme based on time of day
    const hour = new Date().getHours();
    setTheme(hour >= 6 && hour < 18 ? 'light' : 'dark');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: theme }}>
      <div className={`${theme} contents`}>
        <div
          className={classNames(
            'flex-1 p-4 bg-sky-300 text-black transition-colors dark:bg-sky-900 dark:text-white',
            robotoCondensed.className
          )}
        >
          <main className='flex flex-col mx-auto w-full max-w-container'>{children}</main>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
