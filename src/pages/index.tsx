import React from 'react';
import { Container } from '../components/Container';
import { Apps } from '../components/Apps';
import { LogoBackground } from '../components/LogoBackground';
import { useTime } from '../utils/useTime';

export default function HomePage() {
  const date = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const time = useTime('minute');

  return (
    <Container>
      <div className='relative flex w-full flex-1 flex-col items-center gap-4 py-10 px-4'>
        <LogoBackground />

        <span className='text-xl'>{date}</span>

        <span className='text-6xl' suppressHydrationWarning={true}>
          {time.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}
        </span>

        <span>Welcome to Plant Time!</span>

        <div className='w-full mt-auto'>
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
    </Container>
  );
}
