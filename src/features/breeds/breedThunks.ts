import {fetchBreedsApi} from "@/api/dogApi";
import {REQUEST_STATUS} from "@/constants/status";
import type {RootState} from "@/store";
import type {ApiError} from "@/types/api.types";
import type {DogBreed} from "@/types/breed.types";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

/**
 * Asynchronous thunk to fetch the complete list of dog breeds from the API.
 * Uses a condition to prevent concurrent or duplicate fetching if data is already loaded or loading.
 */
export const fetchBreeds = createAsyncThunk<
  DogBreed[],
  void,
  { state: RootState; rejectValue: ApiError }
>(
  'breeds/fetchBreeds',
  async (_, {rejectWithValue}) => {
    try {
      return await fetchBreedsApi();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue({
          message: e.response?.data?.message || e.message || 'Network error occurred',
          code: e.response?.status,
        });
      }

      if (e instanceof Error) {
        return rejectWithValue({message: e.message});
      }

      return rejectWithValue({message: 'Failed to load dog breeds'});
    }
  },
  {
    condition: (_, {getState}) => {
      const {request} = getState().breeds;

      return !(request.status === REQUEST_STATUS.LOADING || request.data !== null);
    },
  }
)
