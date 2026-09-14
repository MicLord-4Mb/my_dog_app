import { createContext, useContext } from 'react';
import type { BreedGridControllerReturn } from '@/features/breeds/hooks/useBreedGridController';

/**
 * Context holding the controller state for the `BreedGrid` compound component family.
 */
export const BreedGridContext = createContext<BreedGridControllerReturn | null>(null);

/**
 * Custom React hook to consume the `BreedGrid` controller context.
 * Enforces that consumer components are nested within a `<BreedGrid />` provider.
 * 
 * @returns {BreedGridControllerReturn} Controller state and actions.
 * @throws {Error} If called outside of a `BreedGridProvider`.
 */
export function useBreedGridContext(): BreedGridControllerReturn {
  const context = useContext(BreedGridContext);
  if (!context) {
    throw new Error(
      'useBreedGridContext must be used within a <BreedGridProvider /> or <BreedGrid /> compound component.'
    );
  }
  return context;
}
