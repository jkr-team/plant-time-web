import { useEffect, useRef, type MutableRefObject, RefObject } from 'react';

export function useScrollToBottom<T extends HTMLElement>(): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current?.scrollHeight, behavior: 'smooth' });
  });

  return ref;
}
