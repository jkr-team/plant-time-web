import React, { useEffect } from 'react';
import { Typewriter } from './Typewriter';

export type FormStepComponent = React.FC<{ onSubmit: () => void }>;

type FormStep = {
  title: string;
  description?: string;
  component: FormStepComponent;
};

type MultiStepFormProps = {
  steps: FormStep[];
  onSubmit: () => void;
};

export const MultiStepForm = ({ steps, onSubmit }: MultiStepFormProps) => {
  const [step, setStep] = React.useState(0);
  const Step = steps[step].component;

  const [showDescription, setShowDescription] = React.useState(false);
  const [isDoneTyping, setIsDoneTyping] = React.useState(false);

  useEffect(() => {
    console.log('stepIdx', step);
    setShowDescription(false);
    setIsDoneTyping(false);
  }, [step]);

  return (
    <div>
      <div className='flex flex-col'>
        <Typewriter
          key={steps[step].title}
          className='text-4xl'
          value={steps[step].title}
          timing={50}
          onCompleted={() => (steps[step].description ? setShowDescription(true) : setIsDoneTyping(true))}
        />
        {steps[step].description && showDescription && (
          <Typewriter
            key={steps[step].description}
            className='text-xl'
            value={steps[step].description || ''}
            timing={20}
            onCompleted={() => setIsDoneTyping(true)}
          />
        )}
      </div>

      {isDoneTyping && (
        <div className='animate-fade-in'>
          <Step key={steps[step].title} onSubmit={() => setStep(step + 1)} />
        </div>
      )}
    </div>
  );
};
