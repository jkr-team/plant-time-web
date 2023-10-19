import React from 'react';
import { ThemeContext } from '../contexts/theme';

export const ThemeSwitch = () => {
 const { theme, setTheme } = React.useContext(ThemeContext);

  return (
    <div className='flex items-center justify-center'>
      <div className='relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in'>
        <input
          type='checkbox'
          name='theme-toggle'
          id='theme-toggle'
          className='invisible'
          onChange={(e) => {
            setTheme(e.target.checked ? 'dark' : 'light');
          }}
        />
        <label
          htmlFor='theme-toggle'
          className='block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer'
        ></label>
      </div>
    </div>
  );
}