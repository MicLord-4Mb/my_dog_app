export const FAVORITE_ACTION_TYPES = {
  TOGGLE_FAVORITE: 'favorites/TOGGLE_FAVORITE',
} as const;

export interface FavoritesState {
  favoritesIds: string[];
}

export interface ToggleFavoriteAction {
  type: typeof FAVORITE_ACTION_TYPES.TOGGLE_FAVORITE;
  payload: string;
}

export type FavoriteActionsTypes = ToggleFavoriteAction;