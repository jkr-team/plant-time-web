import React from 'react';

export default function About() {
  return (
    <div className='flex w-96 flex-col items-center justify-center'>
      <div className='flex w-full max-w-2xl flex-col items-center justify-center'>
        <h1 className='text-center text-4xl font-bold'>About</h1>
        <p className='text-center text-lg'>
          Plant Time is a web app that helps you decide what to plant in your garden. It uses your location and
          preferences to recommend plants that will thrive in your environment.
        </p>
        <p className='text-center text-lg'>Plant Time is a project by </p>
      </div>
    </div>
  );
}
