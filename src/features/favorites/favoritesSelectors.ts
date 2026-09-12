import type { FavoritesState } from "@/features/favorites/favoritesType";

/**
 * State contract interface representing slices containing the `favorites` domain.
 */
export interface HasFavoritesState {
  favorites: FavoritesState;
}

/**
 * RTK Migration Note:
 * When migrating to Redux Toolkit (RTK), this domain will be converted to a `createSlice({ name: 'favorites', ... })`.
 * The selectors below remain 100% compatible with the RTK slice structure.
 */

/**
 * Selector extracting array of favorited breed IDs.
 */
export const selectFavoritesIds = (state: HasFavoritesState): string[] =>
  state.favorites.favoritesIds;

/**
 * Curried selector checking whether a specific breed ID is bookmarked as favorite.
 * 
 * @param breedId - Unique identifier of the target breed.
 */
export const selectIsBreedInFavorites =
  (breedId: string) =>
  (state: HasFavoritesState): boolean =>
    state.favorites.favoritesIds.includes(breedId);

/**
 * Selector computing total count of favorited breeds.
 */
export const selectFavoritesCount = (state: HasFavoritesState): number =>
  state.favorites.favoritesIds.length;
