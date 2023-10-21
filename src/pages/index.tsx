import React, { useState } from 'react';
import ChatForm, { FormStep } from '../components/ChatForm';
import Container from '../components/Container';
import classNames from 'classnames';
import Spinner from '../img/spinner.svg';

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
        "We're here to help you to decide what to plant in your garden.",
        'To get started, please let us know your location. (We will not store this information.)',
      ],
      onSubmit: async (value) => {
        console.log(value);

        //await delay(4000, null);

        return value == 'balls' ? 'Invalid location.' : '';
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
      id: 'soil-ph-step',
      prompt: ['What is your soil pH?', 'You can find this out with a soil test kit.'],
      onSubmit: async (value) => {
        const parsedValue = parseFloat(value);

        if (isNaN(parsedValue) || parsedValue < 0 || parsedValue > 14) {
          return 'Soil pH must be a number between 0 and 14.';
        }

        return '';
      },
    },
  ];

  const [formCompleted, setFormCompleted] = useState(false);
  const wrapper = React.useRef<HTMLDivElement>(null);
  const [showRecommendations, setShowRecommendations] = useState(false);

  return (
    <div className='flex flex-1 flex-col items-center justify-center md:p-6'>
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
            <Spinner className='w-36' />

            <span className='text-center text-2xl'>Please wait while we find you some recommendations.</span>
          </div>
        )}
      </Container>
    </div>
  );
}
