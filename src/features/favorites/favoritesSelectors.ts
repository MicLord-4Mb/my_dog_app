import type { RootState } from "@/store";
import { createSelector } from '@reduxjs/toolkit';

/**
 * Selector extracting the array of favorited breed IDs from state.
 *
 * @param state - The root Redux store state.
 * @returns Array of favorite breed identifier strings.
 */
export const selectFavoritesIds = (state: RootState) =>
  state.favorites.favoritesIds;

/**
 * Memoized selector transforming the favorites array into a Set for O(1) lookup.
 *
 * @returns Set containing unique favorite breed identifier strings.
 */
export const selectFavoritesSet = createSelector(
  [selectFavoritesIds],
  (ids): Set<string> => new Set(ids)
);

/**
 * Selector computing the total count of favorited breeds.
 *
 * @param state - The root Redux store state.
 * @returns Total number of bookmarked breeds.
 */
export const selectFavoritesCount = (state: RootState): number =>
  state.favorites.favoritesIds.length;
