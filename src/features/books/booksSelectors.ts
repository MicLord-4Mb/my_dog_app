import { createSelector } from 'reselect';
import type { RootState } from '@/store';



export const selectBooksQuery = (state: RootState) => state.books.query;
export const selectBooksMode = (state: RootState) => state.books.mode;
export const selectBooksStatus = (state: RootState) => state.books.request.status;
export const selectBooksError = (state: RootState) => state.books.request.error;
export const selectBooksList = (state: RootState) => state.books.request.data;
export const selectSelectedBookKey = (state: RootState) => state.books.selectedBookKey;

export const selectSelectedBook = createSelector(
  [selectBooksList, selectSelectedBookKey],
  (books, key) => {
    if (!books || !key) return null;
    return books.find((b) => b.key === key) ?? null;
  },
);
