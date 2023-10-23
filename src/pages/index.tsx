import React, { useState } from 'react';
import ChatForm, { FormStep } from '../components/ChatForm';
import Container from '../components/Container';
import classNames from 'classnames';
import { geocode, getLocation } from '../utils/geolocation';
import PlantsGrid from '../components/PlantsGrid';

const testPlants = [
  {
    name: 'Janet Craig',
    scientificName: 'Dracaena deremensis',
    image: 'http://www.tropicopia.com/house-plant/thumbnails/5556.jpg',
    season: 'Winter / Spring',
    family: 'Liliaceae',
    heightPotential: 366,
    careInformation: 'Water when soil is dry to the touch. Fertilize once a month during the growing season.',
  },
];

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
        'To get started, please let us know your location.',
        'You can enter your address or "current" to use your current location.',
        'We will not store any of your information.',
      ],
      onSubmit: async (value) => {
        if (value == '') {
          return 'Please enter a location.';
        }

        try {
          const latlng =
            value.toLowerCase().trim() == 'current'
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
      id: 'pot-diameter-step',
      prompt: ['What is the diameter of the pot you are using?', 'In centimeters.'],
      onSubmit: async (value) => {
        const parsedValue = parseFloat(value);

        if (isNaN(parsedValue) || parsedValue < 0) {
          return 'Pot diameter must be a positive number.';
        }

        return '';
      },
    },
    {
      id: 'height-step',
      prompt: [
        'What is the maximum potential growth height you would prefer for your plants?',
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
    {
      id: 'attention-step',
      prompt: ['Are you ok with a plant that requires a lot of attention?', 'i.e one that needs to be pruned and/or watered often.', 'Yes or no?'],
      onSubmit: async (value) => {
        switch (value.toLowerCase().trim()) {
          case 'yes':
          case 'no':
            return '';
          default:
            return 'Please enter yes or no.';
        }
      },
    },
  ];

  const [formCompleted, setFormCompleted] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);

  return (
    <main className='flex flex-1 flex-col items-center justify-center md:p-6'>
      <Container wide={showRecommendations}>
        {!showRecommendations && (
          <div
            className={classNames('flex w-full flex-1 flex-col', {
              'delay-700 duration-700 animate-out fade-out fill-mode-forwards': formCompleted,
            })}
            onAnimationEnd={(e) => setShowRecommendations(true)}
          >
            <div className='contents' onAnimationEnd={(e) => e.stopPropagation()}>
              <ChatForm steps={formSteps} onSubmit={() => setFormCompleted(true)} />
            </div>
          </div>
        )}

        {showRecommendations && <PlantsGrid plants={testPlants} />}
      </Container>
    </main>
  );
}
