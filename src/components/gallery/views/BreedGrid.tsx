import type { ReactNode } from 'react';
import { useBreedGridController } from '@/features/breeds/hooks/useBreedGridController';
import { BreedGridProvider } from './grid/BreedGridContext';
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
function BreedGridRoot({ children }: BreedGridProps) {
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

/**
 * Compound Component family for the Breed Catalog Grid view.
 * 
 * Subcomponents:
 * - `BreedGrid.Header`: Renders page title, search bar, and group filter chips.
 * - `BreedGrid.Empty`: Renders empty result state with reset button.
 * - `BreedGrid.Desktop`: Renders multi-column card grid with pagination.
 * - `BreedGrid.Mobile`: Renders single-column list with infinite scroll.
 */
export const BreedGrid = Object.assign(BreedGridRoot, {
  Header: BreedGridHeader,
  Empty: BreedGridEmpty,
  Desktop: BreedGridDesktop,
  Mobile: BreedGridMobile,
});
