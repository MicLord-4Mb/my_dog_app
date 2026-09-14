import React from 'react';
import { BreedSelect } from '@/components/gallery/filters/BreedSelect';
import { BreedCard } from '@/components/gallery/cards/BreedCard';
import { GalleryEmpty } from '@/components/gallery/views/GalleryEmpty';
import { useBreedDetailController } from '@/features/breeds/hooks/useBreedDetailController';

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
 * Refactored: Fully delegates state management, route params resolution,
 * and keyboard navigation to `useBreedDetailController`.
 */
export const BreedDetailView: React.FC = () => {
  const {
    displayBreed,
    groupBreeds,
    prevBreed,
    nextBreed,
    positionText,
    handleNavigateBreed,
  } = useBreedDetailController();

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
              positionText={positionText}
            />
          ) : (
            <GalleryEmpty />
          )}
        </main>
      </div>
    </div>
  );
};
