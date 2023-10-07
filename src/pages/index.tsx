import { Typewriter } from '../components/Typewriter';
import { useEffect, useState } from 'react';
import { MultiStepForm, FormStepComponent } from '../components/MultiStepForm';
import { step } from 'next/dist/experimental/testmode/playwright/step';

const steps = [
  {
    title: "What's your location?",
    description: 'We need to know where you are to give you the best recommendations.',
    component: ({ onSubmit }: { onSubmit: () => void }) => {
      return (
        <input
          type='text'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              console.log('submitted location');
              onSubmit();
            }
          }}
        ></input>
      );
    },
  },
  {
    title: 'What kind of soil do you have?',
    description: 'We need to know what kind of soil you have to give you the best recommendations.',
    component: ({ onSubmit }: { onSubmit: () => void }) => {
      return (
        <input
          type='text'
          onSubmit={() => {
            console.log('submitted soil');
            onSubmit();
          }}
        ></input>
      );
    },
  },
];

export default function Home() {
  return (
    <main className='flex flex-col'>
      <MultiStepForm steps={steps} onSubmit={() => console.log('form fully completed')}></MultiStepForm>
    </main>
  );
}
