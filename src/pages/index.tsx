import React, { useEffect, useState } from 'react';
import ChatForm, { FormStep } from '../components/ChatForm';
import Container from '../components/Container';
import classNames from 'classnames';
import { City, geocode, getClosestCity, getLocation } from '../utils/geolocation';
import PlantsGrid from '../components/PlantsGrid';
import ThemeSwitch from '../components/ThemeSwitch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faFaceSadTear } from '@fortawesome/free-solid-svg-icons';
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
        'We will not store any of your information.',
      ],
      onSubmit: async (value) => {
        if (value == '') {
          return 'Please enter a location.';
        }

        try {
          const input = value.toLowerCase().trim();
          /*await geocode(value)*/
          const latlng = { lat: 43.65107, lng: -79.347015 };
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

  const [formCompleted, setFormCompleted] = useState(true);
  const [showRecommendations, setShowRecommendations] = useState(true);
  const [showAbout, setShowAbout] = useState(false);
  const [apiError, setApiError] = useState(null as Error | null);

  useEffect(() => {
    // Check if the form hasn't been completed or if we already have recommendations before making the API call
    if (!formCompleted || plants.length > 0) return;

    // @ts-expect-error sometimes typescript makes me cry
    const params = new URLSearchParams({ ...preferences, city: preferences.city?.name });

    fetch(`/api/plants${params}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw new Error(`${response.status} ${response.statusText}`);
      })
      .then((data: Plant[]) => {
        setPlants(data);
      })
      .catch((err) => {
        // Display error to user
        setApiError(err);
      });
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
        {showRecommendations && !apiError && (
          <div className='contents' inert={showAbout ? '' : undefined}>
            <PlantsGrid plants={plants} />
          </div>
        )}

        {/* Error message if we failed to retrieve results from our api */}
        {apiError && (
          <div className='absolute left-1/2 top-[calc(50%_-_48px)] flex -translate-x-1/2 -translate-y-1/2 flex-col gap-6 text-center text-4xl text-red-800 transition-none dark:text-red-300'>
            <FontAwesomeIcon className='text-8xl duration-700 animate-in fade-in' icon={faFaceSadTear} />

            <span className="duration-700 animate-in fade-in">{apiError.message}</span>
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
