import { TextBubble } from '../components/TextBubble';
import { Chat } from '../components/Chat';
import { useState } from 'react';
import { User, UserContext } from '../contexts/user';
import { TypingIndicator } from '../components/TypingIndicator';
import { MultiStepForm } from '../components/MultiStepForm';

export default function Home() {
  const [user, setUser] = useState({
    location: { lat: NaN, lng: NaN },
    soilType: '',
    soilPH: NaN,
  } as User);

  return (
    <UserContext.Provider
      value={{
        user: user,
        updateLocation: (lat: number, lng: number) => setUser({ ...user, location: { lat, lng } }),
        updateSoilType: (soilType: string) => setUser({ ...user, soilType }),
        updateSoilPH: (soilPH: number) => setUser({ ...user, soilPH }),
      }}
    >
      <div className='md:w-1/2 lg:w-1/3 flex flex-col flex-1 bg-white shadow-lg dark:bg-zinc-800 border-8 border-zinc-700 rounded-3xl'>
        <MultiStepForm
          steps={[
            {
              id: 'location-step',
              prompt: ['Welcome to Plant Time!', "I'm here to help you find the best plants for your garden."],
              component: <input name="location" className="w-full bg-transparent" />,
            },
            {
              id: 'soil-type-step',
              prompt: ['What type of soil do you have?', 'Sandy, loamy, or clay?'],
              component: <input name="location" className="w-full bg-transparent" />,
            },
            {
              id: 'soil-ph-step',
              prompt: ['What is your soil pH?', 'You can find this out with a soil test kit.'],
              component: <input name="location" className="w-full bg-transparent" />,
            },
          ]}
          onSubmit={() => {}}
        />
      </div>
    </UserContext.Provider>
  );
}
