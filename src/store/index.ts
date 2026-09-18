import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from 'redux-logger'
import breedReducer from "@/features/breeds/breedSlice";
import favoritesReducer from "@/features/favorites/favoritesSlice";
import booksReducer from "@/features/books/booksSlice";
import userReducer from "@/features/auth/userSlice";
import tokenReducer from "@/features/auth/tokenSlice";


const logger = createLogger({
  collapsed: true,
  duration: true,
  diff: true,
})

/**
 * Application Redux store configuration.
 * Includes reducers for all feature slices and development logging middleware.
 */
export const store = configureStore({
  reducer: {
    breeds: breedReducer,
    favorites: favoritesReducer,
    books: booksReducer,
    user: userReducer,
    token: tokenReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware();

    if (import.meta.env.DEV) {
      return middlewares.concat(logger)
    }

    return middlewares;
  }
});

/**
 * Root state type representing the entire Redux store state tree.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * AppDispatch type supporting both synchronous actions and asynchronous thunks.
 */
export type AppDispatch = typeof store.dispatch;

/**
 * An interesting pattern:
 * const select = <T>(selector: (state: RootState) => T): T => selector(store.getState());
 *
 * Example: select(selectBreedsRequestStatus) === REQUEST_STATUS.IDLE
 */