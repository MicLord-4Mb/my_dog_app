import { createSelector } from 'reselect';
import type { RootState } from '@/store';
import type { DogBreed } from '@/types/dog';

/**
 * Base root slice selector for breeds state.
 */
export const selectBreedsState = (state: RootState) => state.breeds;

/**
 * Selector for async request lifecycle state (status, data, error).
 */
export const selectBreedsRequest = (state: RootState) => state.breeds.request;

/**
 * Selector for currently selected breed ID.
 */
export const selectSelectedBreedId = (state: RootState) => state.breeds.selectedBreedId;

// Referential constants to prevent reselect cache invalidation when request.data is null
const EMPTY_ENTITIES: Record<string, DogBreed> = {};
const EMPTY_IDS: string[] = [];

/**
 * Selector extracting normalized dictionary entities from store.
 */
export const selectBreedEntities = (state: RootState) => state.breeds.request.data?.entities || EMPTY_ENTITIES;

/**
 * Selector extracting ordered array of breed IDs from store.
 */
export const selectBreedIds = (state: RootState) => state.breeds.request.data?.ids || EMPTY_IDS;

/**
 * Memoized selector: Reconstructs array of all breed objects from normalized entities and ids.
 */
export const selectAllBreedsArray = createSelector(
  [selectBreedEntities, selectBreedIds],
  (entities, ids) => ids.map(id => entities[id])
);

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
 * Memoized selector: Computes sorted array of unique breed group names available in the catalog.
 */
export const selectUniqueBreedGroups = createSelector(
  [selectAllBreedsArray],
  (breeds) => {
    const groups = new Set<string>();
    breeds.forEach((b) => {
      if (b.breedGroup && b.breedGroup.trim().length > 0) {
        groups.add(b.breedGroup.trim());
      }
    });
    return Array.from(groups).sort();
  }
);

/**
 * Memoized selector: Computes map of breed group names to count of breeds in each group.
 */
export const selectBreedGroupCounts = createSelector(
  [selectAllBreedsArray],
  (breeds) => {
    const counts: Record<string, number> = {};
    breeds.forEach((b) => {
      if (b.breedGroup && b.breedGroup.trim().length > 0) {
        const group = b.breedGroup.trim();
        counts[group] = (counts[group] || 0) + 1;
      }
    });
    return counts;
  }
);

/**
 * Helper predicate checking if a breed belongs to a specified breed group.
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
 */
export const selectBreedsByGroup = createSelector(
  [selectAllBreedsArray, (_state: RootState, group?: string | null) => group],
  (breeds, group) => {
    if (!group || group.toLowerCase() === 'all') return breeds;
    return breeds.filter((b) => isBreedInGroup(b, group));
  }
);

