import React, { useEffect, useState } from 'react';
import ChatForm, { FormStep } from '../components/ChatForm';
import Container from '../components/Container';
import classNames from 'classnames';
import { City, geocode, getClosestCity, getLocation } from '../utils/geolocation';
import PlantsGrid from '../components/PlantsGrid';
import ThemeSwitch from '../components/ThemeSwitch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import DigitalClock from '../components/DigitalClock';
import About from '../components/About';
import { Plant } from '../components/PlantCard';

export default function Home() {
  const [preferences, setPreferences] = useState<{
    city?: City;
    potDiameter?: number;
    height?: string;
    attention?: string;
  }>({});

  const [plants, setPlants] = useState([] as Plant[]);

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
          const input = value.toLowerCase().trim();
          /*await geocode(value)*/
          const latlng = input == 'current' ? await getLocation() : { lat: 43.65107, lng: -79.347015 };
          const city = getClosestCity(latlng);

          setPreferences({ ...preferences, city });
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

        setPreferences({ ...preferences, potDiameter: parsedValue });
        return '';
      },
    },
    {
      id: 'height-step',
      prompt: ['How tall would you like your plants to be?', 'Short, medium, or tall?'],
      onSubmit: async (value) => {
        const input = value.toLowerCase().trim();
        const options = ['short', 'medium', 'tall'];

        if (options.includes(input)) {
          setPreferences({ ...preferences, height: input });
          return '';
        }

        return `Please enter one of the following: ${options.join(', ')}.`;
      },
    },
    {
      id: 'attention-step',
      prompt: [
        'How much effort are you willing to put into the care of the plant?',
        'i.e watering, fertilizing, pruning, etc.',
        'Little, medium, or lots?',
      ],
      onSubmit: async (value) => {
        const input = value.toLowerCase().trim();
        const options = ['little', 'moderate', 'lots'];

        if (options.includes(input)) {
          setPreferences({ ...preferences, attention: input });
          return '';
        }

        return `Please enter one of the following: ${options.join(', ')}.`;
      },
    },
  ];

  const [formCompleted, setFormCompleted] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    // Check if the form hasn't been completed or if we already have recommendations before making the API call
    if (!formCompleted || plants.length > 0) return;

    // TODO: Make this a real API call
    console.log(preferences);

    setPlants([
      {
        name: 'Janet Craig',
        latinName: 'Dracaena deremensis',
        image: 'http://www.tropicopia.com/house-plant/thumbnails/5556.jpg',
        color: 'green',
        family: 'Liliaceae',
        height: 366,
        care: 'Water when soil is dry to the touch. Fertilize once a month during the growing season.',
      },
      {
        name: 'Lady palm',
        latinName: 'Rhapis excelsa',
        image: 'http://www.tropicopia.com/house-plant/thumbnails/5725.jpg',
        color: 'pink',
        family: 'Arecaceae',
        height: 366,
        care: 'Water when soil is dry to the touch. Fertilize once a month during the growing season.',
      },
      {
        name: 'Tailflower',
        latinName: 'Dracaena deremensis',
        image: 'http://www.tropicopia.com/house-plant/thumbnails/5491.jpg',
        color: 'lilac',
        family: 'Araceae',
        height: 61,
        care: 'Water when soil is dry to the touch. Fertilize once a month during the growing season.',
      },
    ]);
  }, [formCompleted]);

  return (
    <main className='flex flex-1 flex-col items-center justify-center md:p-6'>
      <Container
        top={
          <>
            <ThemeSwitch />

            <button
              type='button'
              className='ml-auto mr-2 flex text-zinc-500'
              title='About Plant Time'
              onClick={() => setShowAbout(!showAbout)}
            >
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
            inert={showAbout ? '' : undefined}
          >
            <div className='contents' onAnimationEnd={(e) => e.stopPropagation()}>
              <ChatForm steps={formSteps} onSubmit={() => setFormCompleted(true)} />
            </div>
          </div>
        )}

        {/* Recommended plants will appear in this grid */}
        {showRecommendations && (
          <div className='contents' inert={showAbout ? '' : undefined}>
            <PlantsGrid plants={plants} />
          </div>
        )}

        {/* About "page" */}
        <div
          className={classNames(
            'invisible absolute z-10 flex h-full w-full flex-1 flex-col items-center bg-inherit px-4 pb-4 pt-12 text-black dark:text-white',
            { 'duration-700 animate-in fade-in motion-safe:slide-in-from-bottom': showAbout },
            { 'duration-700 animate-out fade-out motion-safe:slide-out-to-bottom': !showAbout }
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
