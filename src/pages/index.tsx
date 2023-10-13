import { MultiStepForm } from '../components/MultiStepForm';
import { Typewriter } from '../components/Typewriter';
import { type FormStep } from '../components/MultiStepForm';
import { TextInput } from '../components/TextInput';
import { TextBubble } from '../components/TextBubble';
import { Chat } from '../components/Chat';

const steps = [
  {
    title: "Welcome to Plant Time! \n What's your location?",
    component: ({ onSubmit, submit }) => {
      return (
        <TextInput
          type='text'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              console.log('submitted location');
              //onSubmit();
            }
          }}
        />
      );
    },
  },
  {
    title: 'What kind of soil do you have?',
    component: ({ onSubmit }) => {
      return (
        <input
          type='text'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              console.log('submitted soil');
              //onSubmit();
            }
          }}
        ></input>
      );
    },
  },
  {
    title: 'How stinky are you?',
    component: ({ onSubmit }) => {
      return (
        <input
          type='text'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              console.log('submitted soil');
              //onSubmit();
            }
          }}
        ></input>
      );
    },
  },
] as FormStep[];

export default function Home() {
  return (
    <div className="lg:w-1/3 h-screen">
      <Chat>
        <TextBubble type={'received'}>Welcome to Plant Time!</TextBubble>
        <TextBubble type={'received'}>A app that helps you decide what you should plant in your garden today!</TextBubble>
        <TextBubble type={'received'}>To do so we are going to need some information from you.</TextBubble>
        <TextBubble type={'received'}>What's your location?</TextBubble>
        <TextBubble type={'sent'}>6353 Juan Tabo Blvd NE, Apt 6, Albuquerque, New Mexico 87111</TextBubble>
        <TextBubble type={'received'}>ok i pull up</TextBubble>
        <TextBubble type={'received'}>hop out to the after party</TextBubble>
        <TextBubble type={'received'}>you and all your friends</TextBubble>
        <TextBubble type={'received'}>yeah you love to get naughty</TextBubble>
      </Chat>
    </div>
  );
}
