import { TextBubble } from '../components/TextBubble';
import { Chat } from '../components/Chat';
import { useState } from 'react';
import { User, UserContext } from '../contexts/user';
import { TypingIndicator } from '../components/TypingIndicator';
import { ChatForm } from '../components/ChatForm';

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
      <div className='flex flex-1 flex-col items-center justify-end'>
        <div className='md:w-1/2 lg:w-1/3 animate-fly-in-y flex max-h-[60rem] flex-col flex-1 bg-white shadow-lg dark:bg-zinc-800 rounded-3xl'>
          <ChatForm
            steps={[
              {
                id: 'location-step',
                prompt: [
                  'Welcome to Plant Time!',
                  "We're here to help you to decide what to plant in your garden.",
                  'To get started, please let us know your location. (We will not store this information.)',
                ],
                component: <input name='location' className='w-full bg-transparent' key='location' />,
              },
              {
                id: 'soil-type-step',
                prompt: ['What type of soil do you have?', 'Sandy, loamy, or clay?'],
                component: <input name='location' className='w-full bg-transparent' key='soil-type' />,
              },
              {
                id: 'soil-ph-step',
                prompt: ['What is your soil pH?', 'You can find this out with a soil test kit.'],
                component: <input name='location' className='w-full bg-transparent' key='soil-ph' />,
              },
            ]}
            onSubmit={() => {}}
          />
        </div>
      </div>
    </UserContext.Provider>
  );
}
