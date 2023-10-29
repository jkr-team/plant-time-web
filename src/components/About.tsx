import React from 'react';

export default function About() {
  return (
    <div className='flex max-w-xl w-full flex-col items-center justify-center gap-4 p-4'>
      <h1 className='text-center text-4xl font-bold'>About</h1>
      <p className='text-center text-lg'>
        Plant Time is a web app that helps you decide what to plant in your garden. It uses your location and
        preferences to recommend plants that will thrive in your environment.
      </p>
      <p className='text-center text-lg'>Plant Time is a project by </p>
    </div>
  );
}
