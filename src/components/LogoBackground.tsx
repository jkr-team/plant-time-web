import React from 'react';
import LogoSVG from '../img/logo.svg';

export const LogoBackground = () => {
  return (
    <div className='absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 text-green-600 opacity-10 dark:text-green-300'>
      <LogoSVG className='w-48' />
    </div>
  );
};
