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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/**
 * An interesting pattern:
 * const select = <T>(selector: (state: RootState) => T): T => selector(store.getState());
 *
 * Example: select(selectBreedsRequestStatus) === REQUEST_STATUS.IDLE
 */