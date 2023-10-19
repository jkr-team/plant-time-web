import React from 'react';
import { useTime } from '../hooks/useTime';

export const DigitalClock = () => {
  const time = useTime('second');

  return <span>{time.toLocaleTimeString()}</span>;
};
