import React from 'react';
import { Container } from '../components/Container';
import { Apps } from '../components/Apps';
import Logo from '../img/logo.svg';

export default function HomePage() {
  return (
    <Container>
      <Apps
        data={[
          {
            title: 'Get Recommendations',
            url: '/recommendations',
            icon: <div className='h-full w-full'></div>,
          },
          {
            title: 'View All',
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
    </Container>
  );
}
