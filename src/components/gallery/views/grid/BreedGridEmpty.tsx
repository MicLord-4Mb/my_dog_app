import { Button } from '@/components/ui/button';
import { useBreedGridContext } from './BreedGridContext';

const STYLES = {
  emptyContainer: "w-full py-16 px-4 flex flex-col items-center justify-center text-center bg-surface-container-low rounded-3xl border border-secondary-fixed/30",
  emptyIconWrapper: "w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3",
  emptyIcon: "material-symbols-outlined text-[32px]",
  emptyTitle: "font-headline font-bold text-xl text-on-surface",
  emptyDescription: "text-sm text-on-surface-variant max-w-md mt-1 mb-6",
  resetBtn: "rounded-full text-xs font-semibold px-5",
};

/**
 * Compound subcomponent `<BreedGrid.Empty>`.
 * Renders the empty state UI when search query or group filter yields 0 results.
 */
export function BreedGridEmpty() {
  const { isFavoritesMode, searchQuery, handleResetFilters } = useBreedGridContext();

  return (
    <div className={STYLES.emptyContainer}>
      <div className={STYLES.emptyIconWrapper}>
        <span
          className={STYLES.emptyIcon}
          style={{ fontVariationSettings: isFavoritesMode ? "'FILL' 0" : undefined }}
        >
          {isFavoritesMode ? 'favorite' : 'pets'}
        </span>
      </div>
      <h3 className={STYLES.emptyTitle}>
        {isFavoritesMode
          ? searchQuery ? 'No matching favorites' : 'No favorite breeds yet'
          : 'No breeds found'}
      </h3>
      <p className={STYLES.emptyDescription}>
        {isFavoritesMode
          ? 'Start adding breeds to your favorites to build your personal collection.'
          : "We couldn't find any breeds matching your current filter and search query."}
      </p>
      <Button
        variant="default"
        size="sm"
        onClick={handleResetFilters}
        className={STYLES.resetBtn}
      >
        {isFavoritesMode && !searchQuery ? 'Browse All Breeds' : 'Reset Filters'}
      </Button>
    </div>
  );
}
