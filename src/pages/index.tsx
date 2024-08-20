import React from 'react';
import { Apps } from '../components/Apps';
import { LogoBackground } from '../components/LogoBackground';
import { useTime } from '../utils/useTime';
import { motion } from 'framer-motion';
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
        <h1 className="text-4xl text-center">Welcome to Plant Time!</h1>

        <div className='flex-1 w-full max-h-[600px] my-auto z-20'>
          <Apps
            data={[
              {
                title: 'Get Suggestions',
                url: '/suggestions',
                icon: (
                  <div className='flex h-full w-full items-center justify-center text-6xl bg-green-200 dark:bg-green-950 '>
                    <FontAwesomeIcon icon={faWandMagicSparkles} />
                  </div>
                ),
              },
              {
                title: 'View Plants',
                url: '/plants',
                icon: (
                  <div className='flex h-full w-full items-center justify-center text-6xl text-green-500 bg-sky-100 dark:bg-sky-950'>
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
