import { legacy_createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import type { ThunkDispatch } from 'redux-thunk';
import { createLogger } from 'redux-logger';
import breedReducer from '@/features/breeds/breedReducer';
import type { BreedActionTypes } from '@/features/breeds/breedActionTypes';

/**
 * Root Redux reducer combining application feature slices.
 */
const rootReducer = combineReducers({
  breeds: breedReducer,
});

/**
 * Action logger for browser console debugging.
 */
const logger = createLogger({
  collapsed: true,
});

/**
 * Global Redux Store instance configured with Thunk and Redux Logger middleware.
 */
export const store = legacy_createStore(
  rootReducer,
  undefined,
  applyMiddleware(thunk, logger)
);

/** Root Redux state type */
export type RootState = ReturnType<typeof store.getState>;

/** Typed dispatch with Thunk support */
export type AppDispatch = ThunkDispatch<RootState, unknown, BreedActionTypes>;
