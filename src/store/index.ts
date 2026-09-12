import breedReducer from "@/features/breeds/breedReducer";
import {favoritesReducer} from "@/features/favorites/favoritesReducer";
import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    breeds: breedReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;