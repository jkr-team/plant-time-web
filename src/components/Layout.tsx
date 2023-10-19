import React, { useEffect } from 'react';
import { Roboto_Condensed } from 'next/font/google';
import classNames from 'classnames';

const robotoCondensed = Roboto_Condensed({ subsets: ['latin'], weight: ['300', '400', '700'] });

export default function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const setTheme = () => {
      const hour = new Date().getHours();
      document.documentElement.classList.add(hour >= 6 && hour < 18 ? 'light' : 'dark');
    };

    const interval = setInterval(setTheme, 1000 * 60 * 60);
    setTheme();

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={classNames(
        'flex flex-1 flex-col bg-sky-day text-black transition-colors dark:bg-sky-night dark:text-white',
        robotoCondensed.className
      )}
    >
      <main className='mx-auto flex w-full max-w-container flex-1 flex-col'>{children}</main>
    </div>
  );
}
