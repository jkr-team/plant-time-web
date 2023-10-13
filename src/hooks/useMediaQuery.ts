import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const onMatchesChanges = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    const systemTheme = window.matchMedia(query);
    setMatches(systemTheme.matches);
    systemTheme.addEventListener('change', onMatchesChanges);

    return () => {
      systemTheme.removeEventListener('change', onMatchesChanges);
    };
  }, []);

  return matches;
};
