/* eslint-disable consistent-return */
/* eslint-disable max-len */
import { useEffect } from 'react';

/**
 * Execute a function if the element clicked is not inside of the element referenced
 *
 * @param handler function that returns void
 * @param elementRef element ref
 * @param ignoredElement
 * @returns
 */

export function useClickOutside<T>(
  handler: () => void,
  elementRef: React.MutableRefObject<any>,
  ignoredElement?: React.MutableRefObject<any>,
): React.MutableRefObject<T> {
  useEffect(() => {
    document.addEventListener('click', (e) => {
      const clickedElement = e.target as HTMLElement;

      if (ignoredElement) {
        if (!elementRef.current?.contains(clickedElement) && clickedElement !== ignoredElement.current) {
          handler();
        }

        return elementRef.current;
      }

      if (!elementRef.current?.contains(clickedElement)) {
        handler();
      }
    });

    return () => document.removeEventListener('click', () => {});
  }, []);

  return elementRef.current;
}
