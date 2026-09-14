import {REQUEST_STATUS} from "@/constants/status";
import {isBreedInGroup} from "@/lib/breedUtils";
import {fetchBreeds} from "@/features/breeds/breedThunks";
import type {DogBreed} from "@/types/breed.types";
import type {RequestState} from "@/types/request.types";
import {createEntityAdapter, createSlice, type EntityState, type PayloadAction} from "@reduxjs/toolkit";

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
