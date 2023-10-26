import React, { useState } from 'react';
import ChatForm, { FormStep } from '../components/ChatForm';
import Container from '../components/Container';
import classNames from 'classnames';
import { geocode, getLocation } from '../utils/geolocation';
import PlantsGrid from '../components/PlantsGrid';
import ThemeSwitch from '../components/ThemeSwitch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import DigitalClock from '../components/DigitalClock';
import About from '../components/About';

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
        'To get started, please let us know your general location.',
        'You can enter "current" to use your current location.',
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
      prompt: [
        'Are you ok with a plant that requires a lot of attention?',
        'i.e one that needs to be pruned and/or watered often.',
        'Yes or no?',
      ],
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
  const [showAbout, setShowAbout] = useState(false);

  return (
    <main className='flex flex-1 flex-col items-center justify-center md:p-6'>
      <Container
        top={
          <>
            <ThemeSwitch />

            <button className='ml-auto mr-2 text-zinc-500' onClick={() => setShowAbout(!showAbout)}>
              <FontAwesomeIcon icon={faCircleQuestion} />
            </button>

            <div className='flex items-center gap-2 text-black dark:text-white'>
              <DigitalClock />
            </div>
          </>
        }
        wide={showRecommendations}
      >
        {/* Chat Form where user enters input */}
        {!showRecommendations && (
          <div
            className={classNames('flex w-full flex-1 flex-col', {
              'delay-700 duration-700 animate-out fade-out fill-mode-forwards': formCompleted,
            })}
            onAnimationEnd={(e) => setShowRecommendations(true)}
            inert={showAbout ? "" : undefined}
          >
            <div className='contents' onAnimationEnd={(e) => e.stopPropagation()}>
              <ChatForm steps={formSteps} onSubmit={() => setFormCompleted(true)} />
            </div>
          </div>
        )}

        {/* Recommended plants will appear in this grid */}
        {showRecommendations && (
          <div className='contents' inert={showAbout ? "" : undefined}>
            <PlantsGrid
              plants={[
                {
                  name: 'Janet Craig',
                  scientificName: 'Dracaena deremensis',
                  image: 'http://www.tropicopia.com/house-plant/thumbnails/5556.jpg',
                  season: 'Winter / Spring',
                  family: 'Liliaceae',
                  heightPotential: 366,
                  careInformation:
                    'Water when soil is dry to the touch. Fertilize once a month during the growing season.',
                },
                {
                  name: 'Lady palm',
                  scientificName: 'Rhapis excelsa',
                  image: 'http://www.tropicopia.com/house-plant/thumbnails/5725.jpg',
                  season: 'All year',
                  family: 'Arecaceae',
                  heightPotential: 366,
                  careInformation:
                    'Water when soil is dry to the touch. Fertilize once a month during the growing season.',
                },
                {
                  name: 'Tailflower',
                  scientificName: 'Dracaena deremensis',
                  image: 'http://www.tropicopia.com/house-plant/thumbnails/5491.jpg',
                  season: 'All year',
                  family: 'Araceae',
                  heightPotential: 61,
                  careInformation:
                    'Water when soil is dry to the touch. Fertilize once a month during the growing season.',
                },
              ]}
            />
          </div>
        )}

        {/* About "page" */}
        <div
          className={classNames(
            'invisible absolute z-10 flex h-full w-full flex-1 flex-col items-center px-4 pb-4 pt-12 bg-inherit text-black dark:text-white',
            { 'duration-700 animate-in slide-in-from-bottom': showAbout },
            { 'duration-700 animate-out slide-out-to-bottom': !showAbout }
          )}
          onAnimationStart={(e) => showAbout && (e.target as HTMLElement).classList.remove('invisible')}
          onAnimationEnd={(e) => !showAbout && (e.target as HTMLElement).classList.add('invisible')}
        >
          <About />
        </div>
      </Container>
    </main>
  );
}
