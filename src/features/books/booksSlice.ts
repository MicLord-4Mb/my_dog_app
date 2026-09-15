import { REQUEST_STATUS } from "@/constants/status";
import { loadBooks } from "@/features/books/booksThunks";
import type { Book } from "@/types/books.types";
import type { RequestState } from "@/types/request.types";
import { createSlice } from "@reduxjs/toolkit";

export interface BooksState {
  // query: string;
  // mode: SearchMode;
  request: RequestState<Book[]>
  // selectedBookKey: string | null;
}

const initialState: BooksState = {
  // query: '',
  // mode: SEARCH_MODE.ALL,
  request: {
    status: REQUEST_STATUS.IDLE,
    data: null,
    error: null,
  },
  // selectedBookKey: null,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    // changeQuery: (state, action: PayloadAction<string>) => {
    //   state.query = action.payload;
    // },
    // changeSearchMode: (state, action: PayloadAction<SearchMode>) => {
    //   state.mode = action.payload;
    // },
    // selectBook: (state, action: PayloadAction<string>) => {
    //   state.selectedBookKey = action.payload;
    // },
    resetBooks: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadBooks.pending, (state) => {
        state.request.status = REQUEST_STATUS.LOADING;
        // state.request.data = null;
        state.request.error = null;
        // state.selectedBookKey = null;
      })
      .addCase(loadBooks.fulfilled, (state, action) => {
        state.request.status = REQUEST_STATUS.SUCCESS;
        state.request.data = action.payload;
        state.request.error = null;
        // TODO: rewrite this case
        // state.selectedBookKey = action.payload[0]?.key ?? null;
      })
      .addCase(loadBooks.rejected, (state, action) => {
        state.request.status = REQUEST_STATUS.ERROR;
        state.request.data = null;
        state.request.error = action.payload || {
          message: action.error.message || 'Failed to load data.',
        }
      })
  },
});
export const {
  // changeQuery,
  // changeSearchMode,
  // selectBook,
  resetBooks,
} = booksSlice.actions;

export default booksSlice.reducer;