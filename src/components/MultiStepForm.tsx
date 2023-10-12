import React, { useEffect } from 'react';
import { Typewriter } from './Typewriter';

export type FormStepComponent = React.FC<{ onSubmit?: () => void; submit?: (callback: () => void) => void }>;

export type FormStep = {
  title: string;
  component: FormStepComponent;
};

type MultiStepFormProps = {
  steps: FormStep[];
  onSubmit: () => void;
};

export const MultiStepForm = ({ steps, onSubmit }: MultiStepFormProps) => {
  const [step, setStep] = React.useState(0);
  const [isTypewriterDone, setIsTypewriterDone] = React.useState(false);
  const [formComplete, setFormComplete] = React.useState(false);

  const onStepSubmit = () => {
    if (formComplete) return;

    if (step === steps.length - 1) {
      onSubmit();
      setFormComplete(true);
      return;
    }

    setStep(step + 1);
  };

  const StepComponent = steps[step].component;

  useEffect(() => {
    setIsTypewriterDone(false);
  }, [step]);

  return (
    <div className='flex flex-col gap-6 w-full font-medium'>
      {steps.slice(0, step).map((step, i) => (
        <React.Fragment key={step.title + i}>
          {step.title.split('\n').map((line, i) => (
            <span key={line + i} className='text-4xl md:text-6xl'>
              {line}
            </span>
          ))}

          <StepComponent key={step.title + ' component'} />
        </React.Fragment>
      ))}

      <Typewriter
        key={steps[step].title}
        className='text-4xl md:text-6xl gap-6'
        values={steps[step].title.split('\n')}
        timing={50}
        onCompleted={() => setIsTypewriterDone(true)}
      />

      {isTypewriterDone && (
        <div className='animate-fade-in'>
          <StepComponent key={steps[step].title + ' component'} onSubmit={onStepSubmit} />
        </div>
      )}
    </div>
  );
};
