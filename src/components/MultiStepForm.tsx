import React, { useEffect } from 'react';

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


};
