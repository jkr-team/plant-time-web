import React, { useEffect } from 'react';
import Spinner from '../img/spinner.svg';

export default function LoadingMessage({ message }: { message: string }) {
  const [ellipsis, setEllipsis] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setEllipsis((prev) => ((prev + 1) % 4));
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-20 duration-700 animate-in fade-in'>
      <Spinner className='w-36 text-green-600 dark:text-green-300' />

      <div className='flex'>
        <span className='text-center text-3xl text-black dark:text-white'>{message}</span>
        <div className='text-center text-3xl text-black dark:text-white'>
          <span className={ellipsis > 0 ? 'visible' : 'invisible'}>.</span>
          <span className={ellipsis > 1 ? 'visible' : 'invisible'}>.</span>
          <span className={ellipsis > 2 ? 'visible' : 'invisible'}>.</span>
        </div>
      </div>
    </div>
  );
}
