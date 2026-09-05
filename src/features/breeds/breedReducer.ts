import { REQUEST_STATUS } from '@/types/request';
import type { BreedsState, DogBreed, NormalizedData } from '@/types/dog';
import {
  BREED_ACTION_TYPES,
  type BreedActionTypes,
} from '@/features/breeds/breedActionTypes';
import { isBreedInGroup } from '@/features/breeds/breedSelectors';

/**
 * Initial Redux state for the breeds feature slice.
 */
export const initialState: BreedsState = {
  request: {
    status: REQUEST_STATUS.IDLE,
    data: null,
    error: null,
  },
  isRefreshing: false,
  selectedBreedId: null,
};

/**
 * Redux Reducer managing state transitions for the breeds feature slice.
 */
export function breedReducer(
  state: BreedsState = initialState,
  action: BreedActionTypes
): BreedsState {

  switch (action.type) {
    case BREED_ACTION_TYPES.FETCH_PENDING:
      if (state.request.data) {
        return {
          ...state,
          isRefreshing: true,
        };
      }
      return {
        ...state,
        request: {
          status: REQUEST_STATUS.LOADING,
          data: null,
          error: null,
        },
      };

    case BREED_ACTION_TYPES.FETCH_FULFILLED: {
      const items = action.payload;

      const entities: Record<string, DogBreed> = {};
      const ids: string[] = [];

      items.forEach(breed => {
        const idStr = breed.id;
        entities[idStr] = breed;
        ids.push(idStr);
      });

      const normalizedData: NormalizedData<DogBreed> = { entities, ids };

      let selectedBreedId = state.selectedBreedId;

      if (selectedBreedId === null && items.length > 0) {
        selectedBreedId = ids[0];
      }

      return {
        ...state,
        isRefreshing: false,
        request: {
          status: REQUEST_STATUS.SUCCESS,
          data: normalizedData,
          error: null,
        },
        selectedBreedId,
      };
    }

    case BREED_ACTION_TYPES.FETCH_REJECTED:
      return {
        ...state,
        isRefreshing: false,
        request: {
          status: REQUEST_STATUS.ERROR,
          data: null,
          error: action.payload,
        },
      };

    case BREED_ACTION_TYPES.SELECT_BREED:
      return {
        ...state,
        selectedBreedId: action.payload,
      };

    case BREED_ACTION_TYPES.AUTOSELECT_FIRST_IN_GROUP: {
      const group = action.payload;
      const data = state.request.data;
      if (!data) return state;

      const matchingBreed = data.ids
        .map(id => data.entities[id])
        .find(breed => isBreedInGroup(breed, group));

      return {
        ...state,
        selectedBreedId: matchingBreed ? matchingBreed.id : state.selectedBreedId,
      };
    }

    case BREED_ACTION_TYPES.CLEAR_ERROR:
      return {
        ...state,
        request: {
          status: REQUEST_STATUS.IDLE,
          data: null,
          error: null,
        },
      };

    default:
      return state;
  }
}

export default breedReducer;
