import booksReducer from "@/features/books/booksSlice";
import breedReducer from "@/features/breeds/breedSlice";
import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "@/features/favorites/favoritesSlice";
import { createLogger } from 'redux-logger'

const logger = createLogger({
  collapsed: true,
  duration: true,
  diff: true,
})

export const store = configureStore({
  reducer: {
    breeds: breedReducer,
    favorites: favoritesReducer,
    books: booksReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware();

    if (import.meta.env.DEV) {
      return middlewares.concat(logger)
    }

    return middlewares;
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/**
 * An interesting pattern:
 * const select = <T>(selector: (state: RootState) => T): T => selector(store.getState());
 *
 * Example: select(selectBreedsRequestStatus) === REQUEST_STATUS.IDLE
 */