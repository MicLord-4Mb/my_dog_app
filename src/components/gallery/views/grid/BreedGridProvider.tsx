import type { ReactNode } from 'react';
import type { BreedGridControllerReturn } from '@/features/breeds/hooks/useBreedGridController';
import { BreedGridContext } from './BreedGridContext';

/**
 * Props for the `BreedGridProvider` component.
 */
export interface BreedGridProviderProps {
  /** Controller state instance supplied by `useBreedGridController()`. */
  value: BreedGridControllerReturn;
  /** Child nodes of the compound component subtree. */
  children: ReactNode;
}

/**
 * Provider component that distributes the `BreedGrid` controller state to child compound components.
 * 
 * @param props - Provider configuration containing controller value and child nodes.
 */
export function BreedGridProvider({ value, children }: BreedGridProviderProps) {
  return (
    <BreedGridContext.Provider value={value}>
      {children}
    </BreedGridContext.Provider>
  );
}
