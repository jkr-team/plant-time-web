import React, { useState } from 'react';
import ChatForm, { FormStep } from '../components/ChatForm';
import Container from '../components/Container';
import classNames from 'classnames';
import Spinner from '../img/spinner.svg';
import { geocode, getLocation } from '../utils/geolocation';

export default function Home() {
  const [user, setUser] = useState({
    location: { lat: NaN, lng: NaN },
    soilType: '',
    soilPH: NaN,
  });

  const formSteps: FormStep[] = [
    {
      id: 'location-step',
      prompt: [
        'Welcome to Plant Time!',
        "We're here to help you decide what to plant in your garden.",
        'To get started, please let us know your location',
        'You can enter your address or "current" to use your current location.',
        'We will not store any of your information.',
      ],
      onSubmit: async (value) => {
        if (value == '') {
          return 'Please enter a location.';
        }

        try {
          const latlng =
            value.toLowerCase() == 'current'
              ? await getLocation()
              : /*await geocode(value)*/ { lat: 43.65107, lng: -79.347015 };
          console.log(latlng);
        } catch (e) {
          if (e instanceof Error) return e?.message;

          return 'An unknown error occurred.';
        }

        return '';
      },
    },
    {
      id: 'soil-type-step',
      prompt: ['What type of soil do you have?', 'Sandy, loamy, or clay?'],
      onSubmit: async (value) => {
        switch (value.toLowerCase()) {
          case 'sandy':
          case 'loamy':
          case 'clay':
            return '';
          default:
            return 'Soil type must be sandy, loamy, or clay.';
        }
      },
    },
    {
      id: 'width-step',
      prompt: ['What is the width of your garden?', 'In centimeters.'],
      onSubmit: async (value) => {
        const parsedValue = parseFloat(value);

        if (isNaN(parsedValue) || parsedValue < 0) {
          return 'Width must be a positive number.';
        }

        return '';
      },
    },
    {
      id: 'height-step',
      prompt: [
        'What is the maximum height you would prefer for your plants?',
        'In centimeters or "none" if you have no preference.',
      ],
      onSubmit: async (value) => {
        const parsedValue = parseFloat(value);

        if (value !== 'none' && (isNaN(parsedValue) || parsedValue < 0)) {
          return 'Height must be a positive number or none.';
        }

        return '';
      },
    },
  ];

  const [formCompleted, setFormCompleted] = useState(false);
  const wrapper = React.useRef<HTMLDivElement>(null);
  const [showRecommendations, setShowRecommendations] = useState(false);

  return (
    <main className='flex flex-1 flex-col items-center justify-center md:p-6'>
      <Container wide={showRecommendations}>
        {!showRecommendations && (
          <div
            ref={wrapper}
            className={classNames('flex w-full flex-1 flex-col', {
              'delay-700 duration-700 animate-out fade-out fill-mode-forwards': formCompleted,
            })}
            onAnimationEnd={(e) => {
              if (e.target == wrapper.current) {
                setShowRecommendations(true);
              }
            }}
          >
            <ChatForm steps={formSteps} onSubmit={() => setFormCompleted(true)} />
          </div>
        )}

        {showRecommendations && (
          <div className='flex flex-1 flex-col items-center justify-center gap-20 duration-700 animate-in fade-in'>
            <Spinner className='w-36 text-green-600 dark:text-green-300' />

            <span className='text-center text-3xl text-black dark:text-white'>Loading recommendations.</span>
          </div>
        )}
      </Container>
    </main>
  );
}
