import React from 'react';
import { Apps } from '../components/Apps';
import LogoSVG from '../img/logo.svg';
import { useTime } from '../utils/useTime';
import { Layout } from '../components/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faLeaf, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';

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
      <div className='relative flex w-full flex-1 flex-col items-center px-4 py-10'>
        <div className='flex items-center justify-center gap-4 text-center text-4xl text-green-700'>
          <LogoSVG className='block h-[2em]' />
          <h1>Plant Time</h1>
        </div>

        <div className='z-20 my-auto max-h-[600px] w-full flex-1'>
          <Apps
            data={[
              {
                title: 'Get Suggestions',
                url: '/suggestions',
                icon: (
                  <div className='flex h-full w-full items-center justify-center bg-green-200 text-6xl dark:bg-green-600'>
                    <FontAwesomeIcon icon={faWandMagicSparkles} />
                  </div>
                ),
              },
              {
                title: 'View Plants',
                url: '/plants',
                icon: (
                  <div className='flex h-full w-full items-center justify-center bg-sky-100 text-6xl text-green-500 dark:bg-inherit'>
                    <FontAwesomeIcon icon={faLeaf} />
                  </div>
                ),
              },
              {
                title: 'About',
                url: '/about',
                icon: (
                  <div className='flex h-full w-full items-center justify-center text-6xl'>
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
