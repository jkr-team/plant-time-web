import React, { useEffect } from 'react';
import { Roboto_Condensed } from 'next/font/google';
import classNames from 'classnames';

const robotoCondensed = Roboto_Condensed({ subsets: ['latin'], weight: ['300', '400', '700'] });

export default function Layout({ children }: { children: React.ReactNode }) {

  useEffect(() => {
    // Set theme based on time of day
    const hour = new Date().getHours();
    document.documentElement.classList.add(hour >= 6 && hour < 18 ? 'light' : 'dark');
  }, []);

  return (
    <div
      className={classNames(
        'flex-1 p-4 bg-sky-300 text-black transition-colors dark:bg-sky-900 dark:text-white',
        robotoCondensed.className
      )}
    >
      <main className='flex flex-col mx-auto w-full max-w-container'>{children}</main>
    </div>
  );
}
