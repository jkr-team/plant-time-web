import React, { useEffect } from 'react';
import { Roboto_Condensed } from 'next/font/google';
import classNames from 'classnames';
import { useTime } from '../hooks/useTime';

const robotoCondensed = Roboto_Condensed({ subsets: ['latin'], weight: ['300', '400', '700'] });

export default function Layout({ children }: { children: React.ReactNode }) {
  const time = useTime('hour');

  useEffect(() => {
    const hour = time.getHours();
    document.documentElement.classList.add(hour >= 6 && hour < 18 ? 'light' : 'dark');
  }, [time]);

  return (
    <div
      className={classNames(
        'bg-sky-day dark:bg-sky-night flex flex-1 flex-col text-black transition-colors dark:text-white',
        robotoCondensed.className
      )}
    >
      <main className='mx-auto flex w-full max-w-container flex-1 flex-col'>{children}</main>
    </div>
  );
}
