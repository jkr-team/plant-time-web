import { useState, useEffect, useRef, type MutableRefObject, RefObject } from 'react';

export function useFocusWithin<T extends HTMLElement>(): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [isFocusedWithin, setIsFocusedWithin] = useState(false);

  useEffect(() => {
    const element = ref.current;
    const onFocus = () => setIsFocusedWithin(true);
    const onBlur = (e: FocusEvent) => {
      if (!ref.current?.contains(e.relatedTarget as Node)) {
        setIsFocusedWithin(false);
      }
    };

    ref.current?.addEventListener('focusin', onFocus);
    ref.current?.addEventListener('focusout', onBlur);

    return () => {
      element?.removeEventListener('focusin', onFocus);
      element?.removeEventListener('focusout', onBlur);
    };
  }, []);

  return [ref, isFocusedWithin];
}
