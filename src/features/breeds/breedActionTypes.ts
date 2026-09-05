import type { DogBreed } from '@/types/dog';
import type { ApiError } from '@/types/request';

/**
 * Action type constants for the breeds feature slice.
 */
export const BREED_ACTION_TYPES = {
  /** Fetch breeds request initiated */
  FETCH_PENDING: 'breeds/fetchBreeds/pending',
  /** Fetch breeds request succeeded with payload */
  FETCH_FULFILLED: 'breeds/fetchBreeds/fulfilled',
  /** Fetch breeds request failed with error */
  FETCH_REJECTED: 'breeds/fetchBreeds/rejected',
  /** Select specific breed for single-view details */
  SELECT_BREED: 'breeds/selectBreed',
  /** Auto-select first breed in the provided group */
  AUTOSELECT_FIRST_IN_GROUP: 'breeds/autoselectFirstInGroup',
  /** Reset request error state */
  CLEAR_ERROR: 'breeds/clearError',
} as const;

export type BreedActionType = (typeof BREED_ACTION_TYPES)[keyof typeof BREED_ACTION_TYPES];

// Action Interfaces

export interface FetchBreedsPendingAction {
  type: typeof BREED_ACTION_TYPES.FETCH_PENDING;
}

export interface FetchBreedsFulfilledAction {
  type: typeof BREED_ACTION_TYPES.FETCH_FULFILLED;
  payload: DogBreed[];
}

export interface FetchBreedsRejectedAction {
  type: typeof BREED_ACTION_TYPES.FETCH_REJECTED;
  payload: ApiError;
}

export interface SelectBreedAction {
  type: typeof BREED_ACTION_TYPES.SELECT_BREED;
  payload: string | null;
}

export interface AutoselectFirstInGroupAction {
  type: typeof BREED_ACTION_TYPES.AUTOSELECT_FIRST_IN_GROUP;
  payload: string | null;
}

export interface ClearErrorAction {
  type: typeof BREED_ACTION_TYPES.CLEAR_ERROR;
}

/**
 * Discriminated union of all possible action objects for breeds slice.
 */
export type BreedActionTypes =
  | FetchBreedsPendingAction
  | FetchBreedsFulfilledAction
  | FetchBreedsRejectedAction
  | SelectBreedAction
  | AutoselectFirstInGroupAction
  | ClearErrorAction;
