import type {FavoritesState} from "@/features/favorites/favoritesType";

export interface HasFavoritesState {
  favorites: FavoritesState;
}

export const  selectFavoritesIds = (state: HasFavoritesState) =>
  state.favorites.favoritesIds;

export const selectIsBreedInFavorites =
  (breedId: string) =>
    (state: HasFavoritesState): boolean =>
      state.favorites.favoritesIds.includes(breedId);

export const selectFavoritesCount = (state: HasFavoritesState): number =>
  state.favorites.favoritesIds.length;
