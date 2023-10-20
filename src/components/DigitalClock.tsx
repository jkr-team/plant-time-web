import React from 'react';
import { useTime } from '../hooks/useTime';

export default function DigitalClock() {
  const time = useTime('second');

  return <span suppressHydrationWarning={true}>{time.toLocaleTimeString()}</span>;
}
