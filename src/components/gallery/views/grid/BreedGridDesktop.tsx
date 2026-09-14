import { BreedCompactCard } from '@/components/gallery/cards/BreedCompactCard';
import { Pagination } from '@/components/gallery/filters/Pagination';
import { LINKS } from '@/constants/routes';
import { useBreedGridContext } from './BreedGridContext';

const STYLES = {
  desktopSection: "flex flex-col",
  desktopGrid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
};

/**
 * Compound subcomponent `<BreedGrid.Desktop>`.
 * Renders the multi-column paginated grid of breed cards for desktop and tablet screens (>=768px).
 */
export function BreedGridDesktop() {
  const {
    desktopBreeds,
    activeGroup,
    favoritesSet,
    handleToggleFavorite,
    currentPage,
    totalPages,
    setPage,
    filteredCount,
    pageSize,
  } = useBreedGridContext();

  return (
    <div className={STYLES.desktopSection}>
      <section className={STYLES.desktopGrid}>
        {desktopBreeds.map((breed) => (
          <BreedCompactCard
            key={breed.id}
            breed={breed}
            to={LINKS.breed(breed.id, activeGroup)}
            isInFavorites={favoritesSet.has(breed.id)}
            onToggleFavorite={() => handleToggleFavorite(breed.id)}
          />
        ))}
      </section>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
        totalItems={filteredCount}
        pageSize={pageSize}
      />
    </div>
  );
}
