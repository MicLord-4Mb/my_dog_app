import { searchBooks } from "@/api/bookApi";
import { REQUEST_STATUS } from "@/constants/status";
import type { RootState } from "@/store";
import type { ApiError } from "@/types/api.types";
import type { Book, BooksSearchParams } from '@/types/books.types';
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * Asynchronous Redux thunk: Fetches matching books from Open Library catalog.
 *
 * Execution flow:
 * 1. Checks execution condition to cancel duplicate concurrent requests if already loading.
 * 2. Validates that the search query is non-empty before initiating network call.
 * 3. Invokes API client and returns mapped domain models.
 * 4. Normalizes errors (Axios errors, generic Errors, unexpected exceptions) into standard `ApiError`.
 */
export const loadBooks = createAsyncThunk<
  Book[],
  BooksSearchParams,
  { state: RootState; rejectValue: ApiError }
>(
  'books/loadBooks',
  async (params, { rejectWithValue, signal }) => {
    const trQuery = params.query.trim();
    if (!trQuery) {
      return rejectWithValue({ message: 'please enter a valid query.' });
    }

    try {
      return await searchBooks(params, signal);
    } catch (e: unknown) {
      if (axios.isCancel(e) || signal.aborted) {
        console.warn(e, 'Request cancelled');
        throw e;
      }

      if (axios.isAxiosError(e)) {
        return rejectWithValue({
          message: e.response?.data?.message || e.message || 'Network error occurred',
          code: e.response?.status,
        });
      }

      if (e instanceof Error) {
        return rejectWithValue({ message: e.message });
      }

      return rejectWithValue({ message: 'Failed to load books.' });
    }
  }
);


