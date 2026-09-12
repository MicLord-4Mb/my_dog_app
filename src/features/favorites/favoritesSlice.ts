import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface FavoritesState {
  favoritesIds: string[];
}

const initialState: FavoritesState = {
  favoritesIds: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorites: (state, action: PayloadAction<string>) => {
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

export const { toggleFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
