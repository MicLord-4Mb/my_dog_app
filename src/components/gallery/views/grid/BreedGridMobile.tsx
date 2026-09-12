import { BreedCompactCard } from '@/components/gallery/cards/BreedCompactCard';
import { Button } from '@/components/ui/button';
import { LINKS } from '@/constants/routes';
import { useBreedGridContext } from './BreedGridContext';

const STYLES = {
  mobileSection: "flex flex-col gap-4",
  mobileGrid: "grid grid-cols-1 gap-4",
  sentinelWrapper: "w-full py-6 flex flex-col items-center justify-center gap-2",
  spinner: "w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin",
  loadingText: "text-xs text-on-surface-variant",
  loadMoreBtn: "mt-2 rounded-full text-xs font-semibold",
  endMessage: "w-full py-6 text-center text-xs text-on-surface-variant font-medium",
};

/**
 * Compound subcomponent `<BreedGrid.Mobile>`.
 * Renders the single-column list with infinite scroll sentinel for mobile screens (<768px).
 */
export function BreedGridMobile() {
  const {
    mobileBreeds,
    activeGroup,
    favoritesIds,
    handleToggleFavorite,
    filteredCount,
    sentinelRef,
    loadMoreMobile,
    pageSize,
  } = useBreedGridContext();

  return (
    <div className={STYLES.mobileSection}>
      <section className={STYLES.mobileGrid}>
        {mobileBreeds.map((breed) => (
          <BreedCompactCard
            key={breed.id}
            breed={breed}
            to={LINKS.breed(breed.id, activeGroup)}
            isInFavorites={favoritesIds.includes(breed.id)}
            onToggleFavorite={() => handleToggleFavorite(breed.id)}
          />
        ))}
      </section>

      {/* Mobile Loading Sentinel / Trigger for IntersectionObserver */}
      {mobileBreeds.length < filteredCount ? (
        <div ref={sentinelRef} className={STYLES.sentinelWrapper}>
          <div className={STYLES.spinner} />
          <span className={STYLES.loadingText}>
            Loading more breeds ({mobileBreeds.length} of {filteredCount})...
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={loadMoreMobile}
            className={STYLES.loadMoreBtn}
          >
            Load Next {pageSize} Breeds
          </Button>
        </div>
      ) : (
        <div className={STYLES.endMessage}>
          You've reached the end of the list ({filteredCount} breeds) 🎉
        </div>
      )}
    </div>
  );
}
