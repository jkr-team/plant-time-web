import React from 'react';
import { Apps } from '../components/Apps';
import { LogoBackground } from '../components/LogoBackground';
import { useTime } from '../utils/useTime';
import { motion } from 'framer-motion';
import { Layout } from '../components/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faLeaf, faList } from '@fortawesome/free-solid-svg-icons';

export default function HomePage() {
  const date = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const time = useTime('minute');

  return (
    <Layout>
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
                icon: (
                  <div className='flex h-full w-full items-center justify-center text-4xl'>
                    <FontAwesomeIcon icon={faList} />
                  </div>
                ),
              },
              {
                title: 'View Plants',
                url: '/plants',
                icon: (
                  <div className='flex h-full w-full items-center justify-center text-4xl text-green-500'>
                    <FontAwesomeIcon icon={faLeaf} />
                  </div>
                ),
              },
              {
                title: 'About',
                url: '/about',
                icon: (
                  <div className='flex h-full w-full items-center justify-center text-4xl'>
                    <FontAwesomeIcon icon={faCircleQuestion} />
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
    </Layout>
  );
}
