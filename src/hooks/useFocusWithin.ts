import { useState, useEffect, useRef, type MutableRefObject, RefObject } from 'react';

export function useFocusWithin<T extends HTMLElement>(): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [isFocusedWithin, setIsFocusedWithin] = useState(false);

  useEffect(() => {
    const onFocus = () => setIsFocusedWithin(true);
    const onBlur = (e: FocusEvent) => {
      if (!ref.current?.contains(e.relatedTarget as Node)) {
        setIsFocusedWithin(false);
      }
    };

    ref.current?.addEventListener('focusin', onFocus);
    ref.current?.addEventListener('focusout', onBlur);

    return () => {
      ref.current?.removeEventListener('focusin', onFocus);
      ref.current?.removeEventListener('focusout', onBlur);
    };
  }, []);

  return [ref, isFocusedWithin];
}
