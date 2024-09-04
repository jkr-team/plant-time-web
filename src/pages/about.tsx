import React from 'react';
import { twJoin } from 'tailwind-merge';
import { Layout } from '../components/Layout';

export default function AboutPage() {
  const linkClasses = twJoin(
    'w-fit py-1 px-2 rounded-xl text-center text-lg transition-[background-color]',
    'hover:bg-green-500 focus:bg-green-500 dark:hover:bg-green-500 dark:focus:bg-green-500',
    'bg-green-200 dark:bg-green-300 dark:text-black'
  );

  return (
    <Layout>
      <div className='flex w-full flex-col items-center justify-center gap-8 p-14 text-lg'>
        <h1 className='text-center text-4xl font-bold'>About</h1>
        <p className='text-center text-lg'>
          Plant Time is a web app that helps you decide what to plant in your garden. It uses your location and
          preferences to recommend plants that will thrive in your environment.
        </p>

        <div className='flex flex-col items-center gap-2'>
          <p className='text-center text-lg'>Plant Time was built by:</p>
          <a href='https://github.com/khalil5754' className={linkClasses}>
            Khalil Nayef (Back-end Developer)
          </a>
          <a href='#' className={linkClasses}>
            Jocelyn Oja (Back-end Developer)
          </a>
          <a href='https://github.com/RazaMM' className={linkClasses}>
            Raza Mahmood (Front-end Developer)
          </a>
        </div>

        <a href='https://github.com/plant-time-team' className={linkClasses}>
          View the source code on Github!
        </a>
      </div>
    </Layout>
  );
}
