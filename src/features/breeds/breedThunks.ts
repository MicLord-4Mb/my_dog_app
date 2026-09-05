import type { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import { fetchBreedsApi } from '@/api/dogApi';
import type { RootState } from '@/store';
import type { BreedActionTypes } from '@/features/breeds/breedActionTypes';
import {
  fetchBreedsPending,
  fetchBreedsFulfilled,
  fetchBreedsRejected,
} from '@/features/breeds/breedActions';
import { REQUEST_STATUS } from '@/types/request';

/**
 * Asynchronous Redux Thunk action to fetch dog breeds from TheDogAPI.
 * 
 * Flow:
 * 1. Dispatches `FETCH_PENDING` action to set loading state.
 * 2. Invokes Axios API client `fetchBreedsApi()`.
 * 3. On success, dispatches `FETCH_FULFILLED` with mapped domain breed entities.
 * 4. On error, performs type-safe inspection of Axios error response and dispatches `FETCH_REJECTED`.
 */
export const fetchBreeds = (): ThunkAction<void, RootState, unknown, BreedActionTypes> => async (dispatch, getState) => {
  const { status } = getState().breeds.request;
  if (status === REQUEST_STATUS.LOADING) return;

  dispatch(fetchBreedsPending());
  try {
    const data = await fetchBreedsApi();
    dispatch(fetchBreedsFulfilled(data));
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      dispatch(
        fetchBreedsRejected({
          message: err.response?.data?.message || err.message || 'Network error occurred',
          code: err.response?.status,
        })
      );
    } else if (err instanceof Error) {
      dispatch(fetchBreedsRejected({ message: err.message }));
    } else {
      dispatch(fetchBreedsRejected({ message: 'Failed to load dog breeds' }));
    }
  }
};
