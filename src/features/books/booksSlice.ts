import {REQUEST_STATUS} from "@/constants/status";
import {loadBooks} from "@/features/books/booksThunks";
import type {Book, SearchMode} from "@/types/books.types";
import {SEARCH_MODE} from "@/types/books.types";
import type {RequestState} from "@/types/request.types";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface BooksState {
  query: string;
  mode: SearchMode;
  lastSearchedQuery: string;
  lastSearchedMode: SearchMode | null;
  request: RequestState<Book[]>;
  selectedBookKey: string | null;
}

const initialState: BooksState = {
  query: '',
  mode: SEARCH_MODE.ALL,
  lastSearchedQuery: '',
  lastSearchedMode: null,
  request: {
    status: REQUEST_STATUS.IDLE,
    data: null,
    error: null,
  },
  selectedBookKey: null,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    changeQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    changeSearchMode: (state, action: PayloadAction<SearchMode>) => {
      state.mode = action.payload;
    },
    selectBook: (state, action: PayloadAction<string | null>) => {
      state.selectedBookKey = action.payload;
    },
    resetBooks: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadBooks.pending, (state, action) => {
        state.request.status = REQUEST_STATUS.LOADING;
        state.request.data = null;
        state.request.error = null;
        state.lastSearchedQuery = action.meta.arg.query;
        state.lastSearchedMode = action.meta.arg.mode;
      })
      .addCase(loadBooks.fulfilled, (state, action) => {
        state.request.status = REQUEST_STATUS.SUCCESS;
        state.request.data = action.payload;
        state.request.error = null;
        state.lastSearchedQuery = action.meta.arg.query;
        state.lastSearchedMode = action.meta.arg.mode;

        const hasSelected = action.payload.some((b) => b.key === state.selectedBookKey);
        if (!hasSelected) {
          state.selectedBookKey = action.payload[0]?.key ?? null;
        }
      })
      .addCase(loadBooks.rejected, (state, action) => {
        state.request.status = REQUEST_STATUS.ERROR;
        state.request.data = null;
        state.request.error = action.payload || {
          message: action.error.message || 'Failed to load data.',
        };
        state.selectedBookKey = null;
      });
  },
});

export const {
  changeQuery,
  changeSearchMode,
  selectBook,
  resetBooks,
} = booksSlice.actions;

export default booksSlice.reducer;