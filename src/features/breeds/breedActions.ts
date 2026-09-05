import {
  BREED_ACTION_TYPES,
  type SelectBreedAction,
  type AutoselectFirstInGroupAction,
  type ClearErrorAction,
  type FetchBreedsPendingAction,
  type FetchBreedsFulfilledAction,
  type FetchBreedsRejectedAction,
} from '@/features/breeds/breedActionTypes';
import type { DogBreed } from '@/types/dog';
import type { ApiError } from '@/types/request';

/**
 * Action creator to select an active breed.
 * 
 * @param id - Breed ID or null.
 */
export const selectBreed = (id: string | null): SelectBreedAction => ({
  type: BREED_ACTION_TYPES.SELECT_BREED,
  payload: id,
});

/**
 * Action creator to autoselect the first breed in a given group.
 * 
 * @param group - Group name.
 */
export const autoselectFirstInGroup = (group: string | null): AutoselectFirstInGroupAction => ({
  type: BREED_ACTION_TYPES.AUTOSELECT_FIRST_IN_GROUP,
  payload: group,
});

/**
 * Action creator to clear API request error state.
 */
export const clearError = (): ClearErrorAction => ({
  type: BREED_ACTION_TYPES.CLEAR_ERROR,
});

/**
 * Action creator indicating start of fetching breeds.
 */
export const fetchBreedsPending = (): FetchBreedsPendingAction => ({
  type: BREED_ACTION_TYPES.FETCH_PENDING,
});

/**
 * Action creator dispatched when breeds are fetched successfully.
 * 
 * @param breeds - Array of dog breed domain models.
 */
export const fetchBreedsFulfilled = (breeds: DogBreed[]): FetchBreedsFulfilledAction => ({
  type: BREED_ACTION_TYPES.FETCH_FULFILLED,
  payload: breeds,
});

/**
 * Action creator dispatched when breed fetching fails.
 * 
 * @param error - ApiError object with message and optional status code.
 */
export const fetchBreedsRejected = (error: ApiError): FetchBreedsRejectedAction => ({
  type: BREED_ACTION_TYPES.FETCH_REJECTED,
  payload: error,
});
