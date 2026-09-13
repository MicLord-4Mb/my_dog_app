import {fetchBreedsApi} from "@/api/dogApi";
import type {ApiError} from "@/constants/api";
import {REQUEST_STATUS} from "@/constants/status";
import type {DogBreed} from "@/features/breeds/breedSlice";
import type {RootState} from "@/store";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBreeds = createAsyncThunk<
  DogBreed[],
  void,
  { state: RootState; rejectValue: ApiError }
>(
  'breeds/fetchBreeds',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchBreedsApi();
      return data;
    } catch (e:unknown) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue({
          message: e.response?.data?.message || e.message || 'Network error occurred',
          code: e.response?.status,
        });
      }

      if (e instanceof Error) {
        return rejectWithValue({ message: e.message });
      }

      return rejectWithValue({ message: 'Failed to load dog breeds' });
    }
  },
  {
    condition: (_, { getState }) => {
      const { request } = getState().breeds;

      return !(request.status === REQUEST_STATUS.LOADING || request.data !== null);
    },
  }

)