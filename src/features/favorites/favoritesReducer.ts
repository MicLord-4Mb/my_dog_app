import {FAVORITE_ACTION_TYPES, type FavoriteActionsTypes, type FavoritesState} from "@/features/favorites/favoritesType";

const initialFavoritesState: FavoritesState = {
  favoritesIds: [],
}

export function favoritesReducer(
  state: FavoritesState = initialFavoritesState,
  action: FavoriteActionsTypes
): FavoritesState {
  switch (action.type) {
    case FAVORITE_ACTION_TYPES.TOGGLE_FAVORITE: {
      const breedId = action.payload;
      const isInFavorites = state.favoritesIds.includes(breedId);

      return {
        ...state,
        favoritesIds: isInFavorites
          ? state.favoritesIds.filter(id => id !== breedId)
          : [...state.favoritesIds, breedId],
      };
    }

    default:
      return state;
  }
}
