import { useEffect, useState } from 'react';

/**
 * A React hook to get the current time.
 * @param updateRate The rate at which the time should update. Can be a number in milliseconds, or one of the following strings: 'second', 'minute', 'hour'.
 * @returns The current time as a Date object.
 */
export const useTime = (updateRate: 'second' | 'minute' | 'hour' | number) => {
  const [time, setTime] = useState(new Date());
  let rate: number;

  switch (updateRate) {
    case 'second':
      rate = 1000;
      break;
    case 'minute':
      rate = 60000;
      break;
    case 'hour':
      rate = 3600000;
      break;
    default:
      rate = updateRate;
      break;
  }

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), rate);
    return () => clearInterval(interval);
  }, []);

  return time;
};
