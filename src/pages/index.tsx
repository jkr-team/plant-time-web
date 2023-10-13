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
            We are here to help you decide what to plant in your garden!
          </TextBubble>
          <TextBubble type={'received'}>To do so we are going to need some information from you.</TextBubble>
          <TextBubble type={'received'}>What's your location?</TextBubble>
          <TextBubble type={'sent'}>6353 Juan Tabo Blvd NE, Apt 6, Albuquerque, New Mexico 87111</TextBubble>
          <TextBubble type={'received'}>What's your soil type?</TextBubble>
          <TextBubble type={'sent'}>Sandy</TextBubble>
          <TextBubble type={'received'}>What's your soil pH?</TextBubble>
          <TextBubble type={'sent'}>7.5</TextBubble>
          <TypingIndicator />
        </Chat>
      </div>
    </UserContext.Provider>
  );
}
