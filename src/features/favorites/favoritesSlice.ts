import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

/**
 * Redux state structure for the favorites feature slice.
 */
export interface FavoritesState {
  /** Array of dog breed IDs that the user has marked as favorite */
  favoritesIds: string[];
}

/**
 * Initial Redux state for the favorites feature slice.
 */
const initialState: FavoritesState = {
  favoritesIds: [],
};

/**
 * Redux Toolkit slice managing the user's favorite dog breeds.
 */
export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    /**
     * Toggles the favorite status of a given breed ID.
     * If the ID exists in the favorites list, it is removed.
     * If it does not exist, it is added.
     */
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const breedId = action.payload;
      const index = state.favoritesIds.indexOf(breedId);

      if (index !== -1) {
        state.favoritesIds.splice(index, 1);
      } else {
        state.favoritesIds.push(breedId);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
