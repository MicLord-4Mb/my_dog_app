import { useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  selectAllBreedsArray,
  selectUniqueBreedGroups,
  selectBreedGroupCounts,
  selectBreedsByGroup,
} from '@/features/breeds/breedSelectors';
import { selectFavoritesIds, selectFavoritesCount } from '@/features/favorites/favoritesSelectors';
import { toggleFavorite } from '@/features/favorites/favoritesActions';
import { BreedCompactCard } from '@/components/gallery/cards/BreedCompactCard';
import { Pagination } from '@/components/gallery/filters/Pagination';
import { Button } from '@/components/ui/button';
import { SearchFilterBar } from '@/components/gallery/filters/SearchFilterBar';
import { GroupFilterChips } from '@/components/gallery/filters/GroupFilterChips';
import { useGalleryFilters } from '@/features/breeds/hooks/useGalleryFilters';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { LINKS, FAVORITES_GROUP_KEY } from '@/constants/routes';

/** Number of items rendered per page on desktop and loaded per batch on mobile */
const PAGE_SIZE = 8;

const STYLES = {
  container: "w-full flex flex-col gap-8 md:gap-10",
  headerSection: "flex flex-col gap-6",
  headerTopRow: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4",
  title: "font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight",
  subtitle: "text-base sm:text-lg text-on-surface-variant mt-2 max-w-2xl leading-relaxed",
  emptyContainer: "w-full py-16 px-4 flex flex-col items-center justify-center text-center bg-surface-container-low rounded-3xl border border-secondary-fixed/30",
  emptyIconWrapper: "w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3",
  emptyIcon: "material-symbols-outlined text-[32px]",
  emptyTitle: "font-headline font-bold text-xl text-on-surface",
  emptyDescription: "text-sm text-on-surface-variant max-w-md mt-1 mb-6",
  resetBtn: "rounded-full text-xs font-semibold px-5",
  desktopSection: "hidden md:flex flex-col",
  desktopGrid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
  mobileSection: "flex md:hidden flex-col gap-4",
  mobileGrid: "grid grid-cols-1 gap-4",
  sentinelWrapper: "w-full py-6 flex flex-col items-center justify-center gap-2",
  spinner: "w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin",
  loadingText: "text-xs text-on-surface-variant",
  loadMoreBtn: "mt-2 rounded-full text-xs font-semibold",
  endMessage: "w-full py-6 text-center text-xs text-on-surface-variant font-medium",
};

/**
 * Presentational and container component for the breed catalog (Grid View).
 * 
 * Features:
 * - Desktop/tablet view with classic pagination.
 * - Mobile responsive view with progressive loading (Infinite Scroll).
 * - Real-time client-side search and breed group filtering synchronized with URL parameters.
 */
export const BreedGrid = () => {
  const dispatch = useAppDispatch();

  // Redux normalized selectors
  const breeds = useAppSelector(selectAllBreedsArray);
  const breedGroups = useAppSelector(selectUniqueBreedGroups);
  const groupCounts = useAppSelector(selectBreedGroupCounts);

  // Favorites from Redux store
  const favoritesIds = useAppSelector(selectFavoritesIds);
  const favoritesCount = useAppSelector(selectFavoritesCount);

  // Hook managing filter query parameters and URL synchronization
  const {
    group: groupFromUrl,
    currentPage,
    searchQuery,
    setGroup,
    setSearchQuery,
    setPage,
  } = useGalleryFilters();

  // Active group: prioritizing URL query parameter over local props
  const activeGroup = groupFromUrl;
  const isFavoritesMode = activeGroup === FAVORITES_GROUP_KEY;

  // Breeds filtered by active group via memoized selector (now natively supports favorites)
  const baseBreeds = useAppSelector((state) => selectBreedsByGroup(state, activeGroup));

  /**
   * Memoized search query filtering applied on top of group-filtered breeds.
   */
  const filteredBreeds = useMemo(() => {
    if (!searchQuery) return baseBreeds;
    const query = searchQuery.toLowerCase();
    return baseBreeds.filter((breed) =>
      breed.name.toLowerCase().includes(query) ||
      breed.temperament.some((trait) => trait.toLowerCase().includes(query)) ||
      (breed.origin && breed.origin.toLowerCase().includes(query))
    );
  }, [baseBreeds, searchQuery]);

  // Mobile infinite scroll state and IntersectionObserver sentinel
  const { itemCount: mobileCount, setItemCount: setMobileCount, sentinelRef } = useInfiniteScroll({
    totalItems: filteredBreeds.length,
    pageSize: PAGE_SIZE,
  });

  const totalPages = Math.ceil(filteredBreeds.length / PAGE_SIZE);

  /** Desktop paginated slice based on current page */
  const desktopBreeds = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredBreeds.slice(start, start + PAGE_SIZE);
  }, [filteredBreeds, currentPage]);

  /** Mobile progressively accumulated slice */
  const mobileBreeds = useMemo(() => {
    return filteredBreeds.slice(0, mobileCount);
  }, [filteredBreeds, mobileCount]);

  /**
   * Handles group selection change, updating URL query params.
   * 
   * @param group - The selected group name or `null` to reset.
   */
  const handleGroupSelect = (group: string | null) => {
    setGroup(group);
  };

  /**
   * Resets all search and group filters to initial state.
   */
  const handleResetFilters = () => {
    handleGroupSelect(null);
    setSearchQuery('');
  };

  /**
   * Dispatches favorite toggle action to Redux store.
   */
  const handleToggleFavorite = (breedId: string) => {
    dispatch(toggleFavorite(breedId));
  };

  return (
    <div className={STYLES.container}>
      {/* Header, Search Bar & Group Filter Section */}
      <section className={STYLES.headerSection}>
        <div className={STYLES.headerTopRow}>
          <div>
            <h1 className={STYLES.title}>
              {isFavoritesMode ? 'Favorite Breeds' : 'Explore Breeds'}
            </h1>
            <p className={STYLES.subtitle}>
              {isFavoritesMode
                ? 'Your curated collection of beloved dog breeds, with full search and pagination.'
                : 'Discover the perfect companion. Browse through our comprehensive gallery of dog breeds, categorized by group, temperament, and care needs.'}
            </p>
          </div>

          {/* Search Input Bar */}
          <SearchFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Group Filter Chips */}
        <GroupFilterChips
          groups={breedGroups}
          activeGroup={activeGroup}
          onGroupSelect={handleGroupSelect}
          totalCount={breeds.length}
          groupCounts={groupCounts}
          favoritesCount={favoritesCount}
          variant="pills"
        />
      </section>

      {/* Empty State vs. Results Grid */}
      {filteredBreeds.length === 0 ? (
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
              ? (searchQuery ? 'No matching favorites' : 'No favorite breeds yet')
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
      ) : (
        <>
          {/* Desktop/Tablet Grid View with Pagination */}
          <div className={STYLES.desktopSection}>
            <section className={STYLES.desktopGrid}>
              {desktopBreeds.map((breed) => (
                <BreedCompactCard
                  key={breed.id}
                  breed={breed}
                  to={LINKS.breed(breed.id, activeGroup)}
                  isInFavorites={favoritesIds.includes(breed.id)}
                  onToggleFavorite={() => handleToggleFavorite(breed.id)}
                />
              ))}
            </section>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
              totalItems={filteredBreeds.length}
              pageSize={PAGE_SIZE}
            />
          </div>

          {/* Mobile Single-Column View with Infinite Scroll */}
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
            {mobileCount < filteredBreeds.length ? (
              <div ref={sentinelRef} className={STYLES.sentinelWrapper}>
                <div className={STYLES.spinner} />
                <span className={STYLES.loadingText}>
                  Loading more breeds ({mobileBreeds.length} of {filteredBreeds.length})...
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMobileCount((prev) => Math.min(prev + PAGE_SIZE, filteredBreeds.length))}
                  className={STYLES.loadMoreBtn}
                >
                  Load Next {PAGE_SIZE} Breeds
                </Button>
              </div>
            ) : (
              <div className={STYLES.endMessage}>
                You've reached the end of the list ({filteredBreeds.length} breeds) 🎉
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
