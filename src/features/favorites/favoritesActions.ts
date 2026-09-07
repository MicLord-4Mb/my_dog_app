import {FAVORITE_ACTION_TYPES, type ToggleFavoriteAction} from "@/features/favorites/favoritesType";


/**
 * Action creator to toggle favorite status for a specific breed ID.
 *
 * @param breedId - The unique ID of the breed to add or remove from favorites
 * @returns ToggleFavoriteAction object.
 */
export const toggleFavorite = (breedId: string): ToggleFavoriteAction => ({
  type: FAVORITE_ACTION_TYPES.TOGGLE_FAVORITE,
  payload: breedId,
});
