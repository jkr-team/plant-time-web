import React from 'react';
import Container from '../components/Container';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';

export default function About() {
  return (
    <Container
      top={
        <>
          <Link className='text-zinc-800 dark:text-zinc-200' href='/' aria-label='Go Back Home'>
            <FontAwesomeIcon icon={faCircleLeft} />
          </Link>
        </>
      }
    >
      <div className='flex w-full max-w-xl flex-col items-center justify-center gap-8 p-4 text-lg'>
        <h1 className='text-center text-4xl font-bold'>About</h1>
        <p className='text-center text-lg'>
          Plant Time is a web app that helps you decide what to plant in your garden. It uses your location and
          preferences to recommend plants that will thrive in your environment.
        </p>

        <div className='flex flex-col gap-2'>
          <p className='text-center text-lg'>Plant Time was built by:</p>
          <a href='https://github.com/khalil5754' className='text-center text-lg underline'>
            Khalil Nayef (Back-end Developer)
          </a>
          <a href='#' className='text-center text-lg underline'>
            Jocelyn Oja (Back-end Developer)
          </a>
          <a href='https://github.com/RazaMM' className='text-center text-lg underline'>
            Raza Mahmood (Front-end Developer)
          </a>
        </div>

        <a href='https://github.com/plant-time-team' className='rounded-xl bg-zinc-300 px-2 text-black'>
          View the source code on Github!
        </a>
      </div>
    </Container>
  );
}
