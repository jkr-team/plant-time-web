import React from 'react';
import { useTime } from '../hooks/useTime';

export default function DigitalClock() {
  const time = useTime('minute');

  return (
    <span suppressHydrationWarning={true}>
      {time.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}
    </span>
  );
}
