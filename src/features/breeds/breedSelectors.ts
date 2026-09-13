import { createSelector } from 'reselect';
import type { RootState } from '@/store';
import type { DogBreed } from '@/features/breeds/breedSlice';
import { breedAdapter } from "@/features/breeds/breedSlice";
import { FAVORITES_GROUP_KEY } from '@/constants/routes';
import { selectFavoritesSet } from '@/features/favorites/favoritesSelectors';

/**
 * Selector for currently selected breed ID.
 */
export const selectSelectedBreedId = (state: RootState): string | null =>
  state.breeds.selectedBreedId;

const breedsAdapterSelectors = breedAdapter.getSelectors<RootState>(
  (state) => state.breeds.request.data ?? breedAdapter.getInitialState()
);

export const selectBreedById = breedsAdapterSelectors.selectById;

/**
 * Selector extracting normalized dictionary entities from store.
 */
export const selectBreedEntities = breedsAdapterSelectors.selectEntities;

/**
 * Selector extracting ordered array of breed IDs from store.
 */
export const selectBreedIds = breedsAdapterSelectors.selectIds;

/**
 * Memoized selector: Reconstructs array of all breed objects from normalized entities and ids.
 */
export const selectAllBreedsArray = breedsAdapterSelectors.selectAll;

/**
 * Memoized selector: Retrieves currently active `DogBreed` entity or `null`.
 */
export const selectCurrentBreed = createSelector(
  [selectBreedEntities, selectSelectedBreedId],
  (entities, selectedId) => {
    if (selectedId === null) return null;
    return entities[selectedId] || null;
  }
);

/**
 * Memoized selector: Extracts sorted list of unique breed groups present in the data.
 */
export const selectUniqueBreedGroups = createSelector(
  [selectAllBreedsArray],
  (breeds) => {
    const groups = new Set<string>();
    breeds.forEach((breed) => {
      if (breed.breedGroup && breed.breedGroup.trim()) {
        groups.add(breed.breedGroup.trim());
      }
    });
    return Array.from(groups).sort((a, b) => a.localeCompare(b));
  }
);

/**
 * Memoized selector: Computes count of breeds belonging to each unique breed group.
 */
export const selectBreedGroupCounts = createSelector(
  [selectAllBreedsArray],
  (breeds): Record<string, number> => {
    const counts: Record<string, number> = {};
    breeds.forEach((breed) => {
      const group = breed.breedGroup?.trim();
      if (group) {
        counts[group] = (counts[group] || 0) + 1;
      }
    });
    return counts;
  }
);

/**
 * Pure predicate checking whether a breed belongs to a specific group category.
 * Case-insensitive comparison with fallback to true for 'all' or empty filter.
 * 
 * @param breed - DogBreed domain entity.
 * @param group - Target breed group name or null/undefined for any group.
 * @returns boolean indicating if the breed matches the group filter.
 */
export const isBreedInGroup = (breed: DogBreed, group?: string | null): boolean => {
  if (!group || group.toLowerCase() === 'all') return true;
  return breed.breedGroup?.toLowerCase() === group.toLowerCase();
};

/**
 * Memoized selector: Filters all breeds array by active breed group.
 * Supports FAVORITES_GROUP_KEY ('favorites') to return favorite breeds.
 */
export const selectBreedsByGroup = createSelector(
  [
    selectAllBreedsArray,
    selectFavoritesSet,
    (_state: RootState, group?: string | null) => group,
  ],
  (breeds, favoritesSet, group) => {
    if (!group || group.toLowerCase() === 'all') return breeds;
    if (group === FAVORITES_GROUP_KEY) {
      return breeds.filter((b) => favoritesSet.has(b.id));
    }
    return breeds.filter((b) => isBreedInGroup(b, group));
  }
);
