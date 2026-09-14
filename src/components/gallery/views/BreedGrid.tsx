import type { ReactNode } from 'react';
import { useBreedGridController } from '@/features/breeds/hooks/useBreedGridController';
import { BreedGridProvider } from './grid/BreedGridProvider';
import { BreedGridHeader } from './grid/BreedGridHeader';
import { BreedGridEmpty } from './grid/BreedGridEmpty';
import { BreedGridDesktop } from './grid/BreedGridDesktop';
import { BreedGridMobile } from './grid/BreedGridMobile';

const STYLES = {
  container: "w-full flex flex-col gap-8 md:gap-10",
};

/**
 * Props for the `BreedGrid` root component.
 */
export interface BreedGridProps {
  /** Optional custom subcomponent composition. If omitted, standard adaptive layout is rendered. */
  children?: ReactNode;
}

/**
 * Root component of the `BreedGrid` Compound Component family.
 * Initializes `useBreedGridController()` and supplies state through `BreedGridProvider`.
 * 
 * Adaptive Behavior:
 * Uses `isDesktop` media query to conditionally mount ONLY the active view (`Desktop` vs `Mobile`),
 * avoiding DOM clutter, duplicate image fetching, and unnecessary event listeners.
 */
export function BreedGrid({ children }: BreedGridProps) {
  const controller = useBreedGridController();

  return (
    <BreedGridProvider value={controller}>
      <div className={STYLES.container}>
        {children ? (
          children
        ) : (
          <>
            <BreedGridHeader />
            {controller.filteredCount === 0 ? (
              <BreedGridEmpty />
            ) : controller.isDesktop ? (
              <BreedGridDesktop />
            ) : (
              <BreedGridMobile />
            )}
          </>
        )}
      </div>
    </BreedGridProvider>
  );
}

BreedGrid.Header = BreedGridHeader;
BreedGrid.Empty = BreedGridEmpty;
BreedGrid.Desktop = BreedGridDesktop;
BreedGrid.Mobile = BreedGridMobile;
