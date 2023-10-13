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
      <div className='lg:w-1/3 h-screen'>
        <Chat>
          <TextBubble type={'received'}>Welcome to Plant Time!</TextBubble>
          <TextBubble type={'received'}>
            A app that helps you decide what you should plant in your garden today!
          </TextBubble>
          <TextBubble type={'received'}>To do so we are going to need some information from you.</TextBubble>
          <TextBubble type={'received'}>What's your location?</TextBubble>
          <TextBubble type={'sent'}>6353 Juan Tabo Blvd NE, Apt 6, Albuquerque, New Mexico 87111</TextBubble>
          <TextBubble type={'received'}>ok i pull up</TextBubble>
          <TypingIndicator />
        </Chat>
      </div>
    </UserContext.Provider>
  );
}
