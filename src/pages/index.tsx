import { MultiStepForm } from '../components/MultiStepForm';
import { Typewriter } from '../components/Typewriter';
import { type FormStep } from '../components/MultiStepForm';
import { TextInput } from '../components/TextInput';

const steps = [
  {
    title: "Welcome to Plant Time! \n What's your location?",
    component: ({ onSubmit, submit }) => {
      return (
        <TextInput
          type='text'
          size='lg'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              console.log('submitted location');
              //onSubmit();
            }
          }}
        ></TextInput>
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
    <main className='flex flex-col'>
      <MultiStepForm steps={steps} onSubmit={() => console.log('form fully completed')}></MultiStepForm>
    </main>
  );
}
