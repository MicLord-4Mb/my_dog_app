import type { RootState } from "@/store";

/**
 * Selector extracting array of favorited breed IDs.
 */
export const selectFavoritesIds = (state: RootState) =>
  state.favorites.favoritesIds;

/**
 * Curried selector checking whether a specific breed ID is bookmarked as favorite.
 * 
 * @param breedId - Unique identifier of the target breed.
 */
export const selectIsBreedInFavorites =
  (breedId: string) =>
  (state: RootState): boolean =>
    state.favorites.favoritesIds.includes(breedId);

/**
 * Selector computing total count of favorited breeds.
 */
export const selectFavoritesCount = (state: RootState): number =>
  state.favorites.favoritesIds.length;
