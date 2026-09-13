import type {ApiError} from "@/constants/api";
import {REQUEST_STATUS} from "@/constants/status";
import {isBreedInGroup} from "@/lib/breedUtils";
import {fetchBreeds} from "@/features/breeds/breedThunks";
import {createEntityAdapter, createSlice, type EntityState, type PayloadAction} from "@reduxjs/toolkit";

/**
 * Domain model for a dog breed with full characteristics and physical metrics.
 */
export interface DogBreed {
  /** Unique breed identifier */
  id: string;
  /** Breed name */
  name: string;
  /** Purpose the breed was bred for */
  bredFor?: string;
  /** Breed group/category (e.g. Hound, Toy, Working) */
  breedGroup?: string;
  /** Average life expectancy */
  lifeSpan?: string;
  /** Temperament traits array */
  temperament: string[];
  /** Country/region of origin */
  origin?: string;
  /** Description text */
  description?: string;
  /** Historical background */
  history?: string;
  /** Height in centimeters */
  heightMetric?: string;
  /** Height in inches */
  heightImperial?: string;
  /** Weight in kilograms */
  weightMetric?: string;
  /** Weight in pounds */
  weightImperial?: string;
  /** Public photo URL */
  imageUrl: string | null;
}

/**
 * Strongly typed discriminated union representing asynchronous request states.
 */
export type RequestState<T, E = ApiError> =
  | { status: typeof REQUEST_STATUS.IDLE; data: null; error: null }
  | { status: typeof REQUEST_STATUS.LOADING; data: null; error: null }
  | { status: typeof REQUEST_STATUS.SUCCESS; data: T; error: null }
  | { status: typeof REQUEST_STATUS.ERROR; data: null; error: E };

/**
 * Redux state structure for the breeds feature slice.
 */
export interface BreedsState {
  /** Async request lifecycle state containing normalized entities */
  request: RequestState<EntityState<DogBreed, string>>;
  /** Active selected breed ID */
  selectedBreedId: string | null;
}

export const breedAdapter = createEntityAdapter<DogBreed, string>({
  selectId: (breed) => breed.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
})

/**
 * Initial Redux state for the breeds feature slice.
 */
const initialState: BreedsState = {
  request: {
    status: REQUEST_STATUS.IDLE,
    data: null,
    error: null,
  },
  selectedBreedId: null,
};

const breedSlice = createSlice({
  name: 'breeds',
  initialState,
  reducers: {
    selectBreed: (state, action: PayloadAction<string | null>) => {
      state.selectedBreedId = action.payload;
    },
    autoselectFirstInGroup: (state, action: PayloadAction<string | null>) => {
      const breedGroup = action.payload;
      const data = state.request.data;
      if (!data) return;

      const matchingId = data.ids.find((id) => {
        const breed = data.entities[id];
        return breed ? isBreedInGroup(breed, breedGroup) : false;
      });

      if (matchingId) {
        state.selectedBreedId = matchingId;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBreeds.pending, (state) => {
        if (!state.request.data) {
          state.request.status = REQUEST_STATUS.LOADING;
          state.request.error = null;
        }
      })
      .addCase(fetchBreeds.fulfilled, (state, action: PayloadAction<DogBreed[]>) => {
        state.request.status = REQUEST_STATUS.SUCCESS;
        state.request.error = null;

        const normalizedBreed = breedAdapter.setAll(
          breedAdapter.getInitialState(),
          action.payload
        );
        state.request.data = normalizedBreed;

        if (state.selectedBreedId === null && normalizedBreed.ids.length > 0) {
          state.selectedBreedId = normalizedBreed.ids[0];
        }
      })
      .addCase(fetchBreeds.rejected, (state, action) => {
        state.request.status = REQUEST_STATUS.ERROR;
        state.request.data = null;
        state.request.error = action.payload || {
          message: action.error.message || 'Failed to load data.',
        };
      });
  },
});

export const { selectBreed, autoselectFirstInGroup } = breedSlice.actions;
export default breedSlice.reducer;
