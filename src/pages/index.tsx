import { TextBubble } from '../components/TextBubble';
import { Chat } from '../components/Chat';
import { useState } from 'react';
import { User, UserContext } from '../contexts/user';
import { TypingIndicator } from '../components/TypingIndicator';

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
      <div className='lg:w-1/3'>

      </div>
    </UserContext.Provider>
  );
}
