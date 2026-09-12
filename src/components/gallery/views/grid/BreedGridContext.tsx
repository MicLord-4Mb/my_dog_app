import { createContext, useContext, type ReactNode } from 'react';
import type { BreedGridControllerReturn } from '@/features/breeds/hooks/useBreedGridController';

/**
 * Context holding the controller state for the `BreedGrid` compound component family.
 */
const BreedGridContext = createContext<BreedGridControllerReturn | null>(null);

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
