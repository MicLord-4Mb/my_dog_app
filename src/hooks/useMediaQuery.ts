import { useSyncExternalStore } from 'react';

/**
 * Custom React hook that monitors CSS media queries using `useSyncExternalStore`.
 * 
 * Provides a tear-free, SSR-compatible, and reactive subscription to browser viewport changes.
 *
 * @param query - The CSS media query string to evaluate (e.g., `(min-width: 768px)`).
 * @returns `true` if the media query currently matches the viewport; `false` otherwise.
 * 
 * @example
 * const isDesktop = useMediaQuery('(min-width: 768px)');
 * 
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = (onStoreChange: () => void) => {
    const mediaQueryList = window.matchMedia(query);
    mediaQueryList.addEventListener('change', onStoreChange);

    return () => {
      mediaQueryList.removeEventListener('change', onStoreChange);
    };
  };

  const getSnapshot = (): boolean => {
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = (): boolean => {
    return false;
  };

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
