import {REQUEST_STATUS} from "@/constants/status";
import {isBreedInGroup} from "@/lib/breedUtils";
import { createSelector } from 'reselect';
import type { RootState } from '@/store';
import { breedAdapter } from "@/features/breeds/breedSlice";
import { FAVORITES_GROUP_KEY } from '@/constants/routes';
import { selectFavoritesSet } from '@/features/favorites/favoritesSelectors';

/**
 * Selector extracting the currently selected breed ID from the store.
 *
 * @param state - The root Redux store state.
 * @returns The unique ID string of the active breed, or `null` if none is selected.
 */
export const selectSelectedBreedId = (state: RootState): string | null =>
  state.breeds.selectedBreedId;

/**
 * Internal entity adapter selector bundle scoped to `state.breeds.request.data`.
 * Falls back to an empty entity state when data has not yet loaded.
 */
const breedsAdapterSelectors = breedAdapter.getSelectors<RootState>(
  (state) => state.breeds.request.data ?? breedAdapter.getInitialState()
);

/**
 * Entity selector returning a single `DogBreed` entity by its ID.
 *
 * @param state - The root Redux store state.
 * @param id - The unique identifier of the dog breed.
 * @returns The matching `DogBreed` entity or `undefined` if not found.
 */
export const selectBreedById = breedsAdapterSelectors.selectById;

/**
 * Selector extracting the normalized dictionary mapping breed IDs to `DogBreed` entities.
 *
 * @param state - The root Redux store state.
 * @returns Dictionary of normalized entities indexed by ID.
 */
export const selectBreedEntities = breedsAdapterSelectors.selectEntities;

/**
 * Selector extracting an ordered array of all breed IDs.
 *
 * @param state - The root Redux store state.
 * @returns Array of unique breed identifier strings.
 */
export const selectBreedIds = breedsAdapterSelectors.selectIds;

/**
 * Memoized selector: reconstructs the ordered list of all `DogBreed` entities.
 *
 * @param state - The root Redux store state.
 * @returns Sorted array of all `DogBreed` domain models.
 */
export const selectAllBreedsArray = breedsAdapterSelectors.selectAll;

/**
 * Memoized selector: retrieves the active `DogBreed` entity based on `selectedBreedId`.
 *
 * @returns The active `DogBreed` instance or `null` if unselected or not found in entities.
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
 *
 * @returns Alphabetically sorted array of non-empty breed group names.
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
 *
 * @returns Mapping of group names to their respective breed count.
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
 * Memoized selector: Filters all breeds array by active breed group.
 * Supports FAVORITES_GROUP_KEY ('favorites') to return favorite breeds.
 *
 * @param state - The root Redux store state.
 * @param [group] - Breed group filter name, 'all', or `FAVORITES_GROUP_KEY`.
 * @returns Array of breeds matching the target filter.
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

/**
 * Selector retrieving the current lifecycle status of the breeds fetch request.
 *
 * @param state - The root Redux store state.
 * @returns One of the `REQUEST_STATUS` values ('idle', 'loading', 'success', 'error').
 */
export const selectBreedsRequestStatus = (state: RootState) =>
  state.breeds.request.status;

/**
 * Selector extracting the API error payload if the request failed.
 *
 * @param state - The root Redux store state.
 * @returns `ApiError` details if the request is in the ERROR state; otherwise, `null`.
 */
export const selectBreedsError = (state: RootState) =>
  state.breeds.request.status === REQUEST_STATUS.ERROR
    ? state.breeds.request.error
    : null;
