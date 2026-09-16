import { REQUEST_STATUS } from "@/constants/status";
import { loadBooks } from "@/features/books/booksThunks";
import type { Book } from "@/types/books.types";
import type { RequestState } from "@/types/request.types";
import { createEntityAdapter, createSlice, type EntityState, type PayloadAction } from "@reduxjs/toolkit";

/**
 * Entity adapter for normalized Book storage indexed by Open Library key.
 * Results preserve API relevance order as returned by Open Library.
 */
export const booksAdapter = createEntityAdapter<Book, string>({
  selectId: (book) => book.key,
});

/**
 * Redux state structure for the books feature slice.
 */
export interface BooksState {
  /** Async request lifecycle state containing normalized entities */
  request: RequestState<EntityState<Book, string>>;
}

/**
 * Initial Redux state for the books feature slice.
 */
const initialState: BooksState = {
  request: {
    status: REQUEST_STATUS.IDLE,
    data: null,
    error: null,
  },
};

/**
 * Redux Toolkit slice managing books state:
 * - Stores normalized books via `booksAdapter`.
 * - Handles asynchronous request lifecycle for Open Library queries.
 * - Allows clearing/resetting search results back to initial state.
 */
const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    /**
     * Resets books slice state back to initial idle state.
     */
    resetBooks: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadBooks.pending, (state) => {
        state.request.status = REQUEST_STATUS.LOADING;
        state.request.error = null;
      })
      .addCase(loadBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.request.status = REQUEST_STATUS.SUCCESS;
        state.request.data = booksAdapter.setAll(
          booksAdapter.getInitialState(),
          action.payload
        );
        state.request.error = null;
      })
      .addCase(loadBooks.rejected, (state, action) => {
        state.request.status = REQUEST_STATUS.ERROR;
        state.request.data = null;
        state.request.error = action.payload || {
          message: action.error.message || 'Failed to load books.',
        };
      });
  },
});

export const { resetBooks } = booksSlice.actions;

export default booksSlice.reducer;