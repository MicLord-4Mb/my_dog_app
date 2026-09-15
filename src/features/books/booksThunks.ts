import {searchBooks} from "@/api/bookApi";
import {REQUEST_STATUS} from "@/constants/status";
import type {RootState} from "@/store";
import type {ApiError} from "@/types/api.types";
import type {Book, BooksSearchParams} from '@/types/books.types'
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const loadBooks = createAsyncThunk<
  Book[],
  BooksSearchParams,
  { state: RootState; rejectValue: ApiError }
>(
  'books/loadBooks',
  async (params, {rejectWithValue}) => {
    const trQuery = params.query.trim();
    if (!trQuery) {
      return rejectWithValue({message: 'please enter a valid query.'});
    }

    try {
      return await searchBooks(params);
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

      return rejectWithValue({message: 'Failed to load books.'});
    }
  },
  {
    condition: (_, {getState}) => {
      const {request} = getState().books;

      return request.status !== REQUEST_STATUS.LOADING;
    },
  })

