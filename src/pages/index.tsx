import React from 'react';
import { Page } from '../components/Page';
import { Apps } from '../components/Apps';
import { LogoBackground } from '../components/LogoBackground';
import { useTime } from '../utils/useTime';
import { motion } from 'framer-motion';

export default function HomePage() {
  const date = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const time = useTime('minute');

  return (
    <div className='relative flex w-full flex-1 flex-col items-center gap-4 px-4 py-10'>
      <LogoBackground />

      <span className='text-xl'>{date}</span>

      <span className='text-6xl' suppressHydrationWarning={true}>
        {time.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}
      </span>

      <span>Welcome to Plant Time!</span>

      <div className='mt-auto w-full'>
        <Apps
          data={[
            {
              title: 'Get Suggestions',
              url: '/suggestions',
              icon: <div className='h-full w-full'></div>,
            },
            {
              title: 'View Plants',
              url: '/plants',
              icon: <div className='h-full w-full'></div>,
            },
            {
              title: 'About',
              url: '/about',
              icon: <div className='h-full w-full'></div>,
            },
          ]}
        />
      </div>
    </div>
  );
}
