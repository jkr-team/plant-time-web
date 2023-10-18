import { useState } from 'react';
import { User, UserContext } from '../contexts/user';
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
      <div className='flex flex-1 flex-col items-center justify-center md:p-14'>
        <div className='flex w-full flex-1 flex-col rounded-3xl shadow-lg dark:bg-zinc-800'>
          <ChatForm
            steps={[
              {
                id: 'location-step',
                prompt: [
                  'Welcome to Plant Time!',
                  "We're here to help you to decide what to plant in your garden.",
                  'To get started, please let us know your location. (We will not store this information.)',
                ],
                onSubmit: (value) => console.log(value),
              },
              {
                id: 'soil-type-step',
                prompt: ['What type of soil do you have?', 'Sandy, loamy, or clay?'],
                onSubmit: (value) => console.log(value),
              },
              {
                id: 'soil-ph-step',
                prompt: ['What is your soil pH?', 'You can find this out with a soil test kit.'],
                onSubmit: (value) => console.log(value),
              },
            ]}
            onSubmit={() => {}}
          />
        </div>
      </div>
    </UserContext.Provider>
  );
}
