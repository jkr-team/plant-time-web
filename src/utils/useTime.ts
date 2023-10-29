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
    const now = new Date();
    const delay = rate - (now.getTime() % rate);
    let interval: NodeJS.Timeout;

    // The user may want to update the time every minute, but the current time could be something like 12:30:15. The delay should be 45 seconds, not 60. We only need to do this once, so for the first update we use a timeout instead of an interval.
    const timeout = setTimeout(() => {
      setTime(new Date());
      interval = setInterval(() => setTime(new Date()), rate); // We are now in sync with the update rate, so we can use an interval.
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [rate]);

  return time;
};
