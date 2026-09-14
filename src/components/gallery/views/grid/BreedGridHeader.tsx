import { SearchFilterBar } from '@/components/gallery/filters/SearchFilterBar';
import { GroupFilterChips } from '@/components/gallery/filters/GroupFilterChips';
import { useBreedGridContext } from './BreedGridContext';

const STYLES = {
  headerSection: "flex flex-col gap-6",
  headerTopRow: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4",
  title: "font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight",
  subtitle: "text-base sm:text-lg text-on-surface-variant mt-2 max-w-2xl leading-relaxed",
};

/**
 * Compound subcomponent `<BreedGrid.Header>`.
 * Renders page title, subtitle, search filter bar, and group filter chips using controller context.
 */
export function BreedGridHeader() {
  const {
    isFavoritesMode,
    searchQuery,
    setSearchQuery,
    breedGroups,
    activeGroup,
    handleGroupSelect,
    totalBreedsCount,
    groupCounts,
    favoritesCount,
  } = useBreedGridContext();

  return (
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
        totalCount={totalBreedsCount}
        groupCounts={groupCounts}
        favoritesCount={favoritesCount}
        variant="pills"
      />
    </section>
  );
}
