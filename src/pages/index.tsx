import { useState } from 'react';
import { User, UserContext } from '../contexts/user';
import { ChatForm } from '../components/ChatForm';
import { Spinner } from '../components/Spinner';
import { PhoneContainer } from '../components/PhoneContainer';

const FormCompletedScreen = () => (
  <div className='absolute left-0 top-0 z-10 flex h-full w-full flex-col items-center justify-center gap-24 rounded-3xl bg-white p-2 text-black duration-1000 ease-in-out animate-in slide-in-from-bottom dark:bg-zinc-900 dark:text-white'>
    <span className='text-center text-2xl'>Thank you! Please wait while we find you some recommendations. </span>
    <div className='text-9xl'>
      <Spinner />
    </div>
  </div>
);

export default function Home() {
  const [user, setUser] = useState({
    location: { lat: NaN, lng: NaN },
    soilType: '',
    soilPH: NaN,
  } as User);

  const [formCompleted, setFormCompleted] = useState(false);

  return (
    <UserContext.Provider
      value={{
        user: user,
        updateLocation: (lat: number, lng: number) => setUser({ ...user, location: { lat, lng } }),
        updateSoilType: (soilType: string) => setUser({ ...user, soilType }),
        updateSoilPH: (soilPH: number) => setUser({ ...user, soilPH }),
      }}
    >
      <div className='flex flex-1 flex-col items-center justify-center md:p-14'>
        <PhoneContainer>
          <ChatForm
            steps={[
              {
                id: 'location-step',
                prompt: [
                  'Welcome to Plant Time!',
                  "We're here to help you to decide what to plant in your garden.",
                  'To get started, please let us know your location. (We will not store this information.)',
                ],
                onSubmit: async (value) => {
                  console.log(value);
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
            ]}
            onSubmit={() => console.log('Submitted!')}
            submittedMessage='Thank you! Please wait while we find you some recommendations.'
          />
        </PhoneContainer>
      </div>
    </UserContext.Provider>
  );
}
