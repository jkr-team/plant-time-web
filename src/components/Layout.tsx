import React from 'react';
import { useState } from 'react';
import { Roboto_Condensed } from 'next/font/google';
import { ThemeContext } from '../contexts/theme';
import { UserContext, type User } from '../contexts/user';
import classNames from 'classnames';

const robotoCondensed = Roboto_Condensed({ subsets: ['latin'], weight: ['300', '400', '700'] });

export default function Layout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('light' as 'light' | 'dark');

  const [user, setUser] = useState({
    location: { lat: NaN, lng: NaN },
    soilType: '',
    soilPH: NaN,
  } as User);

  const layoutClasses = classNames(
    'flex-1 p-4 bg-sky-300 text-black transition-colors',
    'dark:bg-sky-900 dark:text-white',
    robotoCondensed.className,
    theme
  );

  const mainClasses = classNames('flex flex-col mx-auto w-full max-w-container');

  return (
    <ThemeContext.Provider
      value={{
        theme: theme,
        toggleTheme: () => setTheme(theme === 'light' ? 'dark' : 'light'),
        setTheme: (theme) => setTheme(theme),
      }}
    >
      <UserContext.Provider
        value={{
          user: user,
          updateLocation: (lat: number, lng: number) => setUser({ ...user, location: { lat, lng } }),
          updateSoilType: (soilType: string) => setUser({ ...user, soilType }),
          updateSoilPH: (soilPH: number) => setUser({ ...user, soilPH }),
        }}
      >
        <div className={layoutClasses}>
          <main className={mainClasses}>{children}</main>
        </div>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}
