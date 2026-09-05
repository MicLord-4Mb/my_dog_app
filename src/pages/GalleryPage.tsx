import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchBreeds } from '@/features/breeds/breedThunks';
import { selectBreed } from '@/features/breeds/breedActions';
import { selectAllBreedsArray, selectCurrentBreed, selectBreedEntities } from '@/features/breeds/breedSelectors';
import { REQUEST_STATUS } from '@/types/request';
import { BreedSelect } from '@/components/gallery/BreedSelect';
import { BreedCard } from '@/components/gallery/BreedCard';
import { BreedGrid } from '@/components/gallery/BreedGrid';
import { GalleryLoading } from '@/components/gallery/GalleryLoading';
import { GalleryError } from '@/components/gallery/GalleryError';
import { GalleryEmpty } from '@/components/gallery/GalleryEmpty';
import { useBreedNavigation } from '@/features/breeds/hooks/useBreedNavigation';

const STYLES = {
  container: "w-full max-w-container-max mx-auto px-4 md:px-8 py-6 md:py-10",
  ambientWrapper: "fixed inset-0 pointer-events-none z-[-1] overflow-hidden",
  ambientGlowPrimary: "absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-container/10 rounded-full blur-[100px]",
  ambientGlowTertiary: "absolute bottom-1/4 right-0 w-80 h-80 bg-tertiary-container/10 rounded-full blur-[80px]",
  mainLayout: "flex flex-col gap-6",
  mobileSelectWrapper: "md:hidden",
  desktopGrid: "grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 items-start",
  sidebarWrapper: "hidden md:block",
  mainArea: "w-full"
};

/**
 * Gallery Page Component:
 * 
 * Supports two presentation modes:
 * 1. Single Breed View (`/gallery` or `/gallery/breed/:id`):
 *    - Desktop sidebar or mobile compact combobox with group filters.
 *    - Interactive detailed `BreedCard`.
 * 2. Catalog Grid View (`/gallery/grid`):
 *    - Multi-column `BreedGrid` with live search, group pills, pagination, and infinite scroll.
 */
export const GalleryPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { id } = useParams<{ id?: string }>();

  const { request, isRefreshing } = useAppSelector((state) => state.breeds);
  const allBreeds = useAppSelector(selectAllBreedsArray);
  const breedEntities = useAppSelector(selectBreedEntities);
  const selectedBreedFromState = useAppSelector(selectCurrentBreed);

  const isGridMode = location.pathname.startsWith('/gallery/grid');
  const isBreedDetailRoute = Boolean(id);

  // Initial fetch of breeds catalog on mount
  useEffect(() => {
    if (request.status === REQUEST_STATUS.IDLE) {
      dispatch(fetchBreeds());
    }
  }, [dispatch, request.status]);

  // Synchronize route URL parameters with Redux state for selected breed
  useEffect(() => {
    if (isBreedDetailRoute && id && id !== selectedBreedFromState?.id) {
      dispatch(selectBreed(id));
    }
  }, [id, isBreedDetailRoute, dispatch, selectedBreedFromState?.id]);

  const handleRetry = () => {
    dispatch(fetchBreeds());
  };

  const displayBreed = React.useMemo(() => {
    if (id) {
      return breedEntities[id];
    }
    return selectedBreedFromState || allBreeds[0];
  }, [id, breedEntities, allBreeds, selectedBreedFromState]);

  const { groupBreeds, currentIndex, prevBreed, nextBreed, handleNavigateBreed } = useBreedNavigation({
    currentBreed: displayBreed,
  });

  return (
    <div className={STYLES.container}>
      {/* Ambient background glow decoration */}
      <div className={STYLES.ambientWrapper}>
        <div className={STYLES.ambientGlowPrimary} />
        <div className={STYLES.ambientGlowTertiary} />
      </div>

      {/* Main Content States */}
      {(request.status === REQUEST_STATUS.LOADING && !isRefreshing) && <GalleryLoading />}

      {request.status === REQUEST_STATUS.ERROR && (
        <GalleryError message={request.error?.message || 'Error occurred'} onRetry={handleRetry} />
      )}

      {(request.status === REQUEST_STATUS.SUCCESS || isRefreshing) && (
        <>
          {isGridMode ? (
            /* Grid Catalog View */
            <BreedGrid />
          ) : (
            /* Single Breed View */
            <div className={STYLES.mainLayout}>
              {/* Mobile Select Header */}
              <div className={STYLES.mobileSelectWrapper}>
                <BreedSelect variant="compact" />
              </div>

              {/* Desktop & Tablet Grid Layout */}
              <div className={STYLES.desktopGrid}>
                {/* Desktop Sidebar */}
                <div className={STYLES.sidebarWrapper}>
                  <BreedSelect variant="sidebar" />
                </div>

                {/* Breed Display Area */}
                <main className={STYLES.mainArea}>
                  {displayBreed ? (
                    <BreedCard
                      key={displayBreed.id}
                      breed={displayBreed}
                      onPrev={groupBreeds.length > 1 && prevBreed ? () => handleNavigateBreed(prevBreed) : undefined}
                      onNext={groupBreeds.length > 1 && nextBreed ? () => handleNavigateBreed(nextBreed) : undefined}
                      prevBreedName={prevBreed?.name}
                      nextBreedName={nextBreed?.name}
                      positionText={groupBreeds.length > 1 && currentIndex !== -1 ? `${currentIndex + 1} / ${groupBreeds.length}` : undefined}
                    />
                  ) : (
                    <GalleryEmpty />
                  )}
                </main>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
