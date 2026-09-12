import React, { useMemo } from 'react';
import { useParams } from 'react-router';
import { useAppSelector } from '@/store/hooks';
import { selectAllBreedsArray, selectCurrentBreed, selectBreedEntities } from '@/features/breeds/breedSelectors';
import { selectFavoritesIds } from '@/features/favorites/favoritesSelectors';
import { FAVORITES_GROUP_KEY } from '@/constants/routes';
import { BreedSelect } from '@/components/gallery/filters/BreedSelect';
import { BreedCard } from '@/components/gallery/cards/BreedCard';
import { GalleryEmpty } from '@/components/gallery/views/GalleryEmpty';
import { useBreedNavigation } from '@/features/breeds/hooks/useBreedNavigation';
import { useGalleryFilters } from '@/features/breeds/hooks/useGalleryFilters';

const STYLES = {
  mainLayout: "flex flex-col gap-6",
  mobileSelectWrapper: "md:hidden",
  desktopGrid: "grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 items-start",
  sidebarWrapper: "hidden md:block",
  mainArea: "w-full",
};

/**
 * Single Breed Detail View component.
 * Displays interactive breed sidebar/combobox and detailed breed showcase card.
 * Mounted on `/gallery` (defaulting to first breed) and `/gallery/breed/:id`.
 *
 * Reads breed data from the Redux store (populated by the gallery route loader).
 */
export const BreedDetailView: React.FC = () => {
  const { id } = useParams<{ id?: string }>();

  const allBreeds = useAppSelector(selectAllBreedsArray);
  const breedEntities = useAppSelector(selectBreedEntities);
  const selectedBreedFromState = useAppSelector(selectCurrentBreed);
  const favoritesIds = useAppSelector(selectFavoritesIds);
  const { group: activeGroup } = useGalleryFilters();

  // const displayBreed = useMemo(() => {
  //   if (id) {
  //     return breedEntities[id];
  //   }
  //   return selectedBreedFromState || allBreeds[0];
  // }, [id, breedEntities, allBreeds, selectedBreedFromState]);

  const displayBreed = useMemo(() => {
    if (id) {
      return breedEntities[id];
    }
    if (activeGroup === FAVORITES_GROUP_KEY) {
      const firstFavorite = allBreeds.find((b) => favoritesIds.includes(b.id));
      if (firstFavorite) return firstFavorite;
      return null;
    }
    return selectedBreedFromState || allBreeds[0];
  }, [id, breedEntities, allBreeds, selectedBreedFromState, activeGroup, favoritesIds]);

  const { groupBreeds, currentIndex, prevBreed, nextBreed, handleNavigateBreed } = useBreedNavigation({
    currentBreed: displayBreed,
  });

  return (
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
  );
};
