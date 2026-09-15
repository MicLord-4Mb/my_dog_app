import type { RouteObject } from 'react-router';
import { replace } from 'react-router';
import { type SearchMode, SEARCH_MODE } from '@/types/books.types';
import { store } from '@/store';
import { changeQuery, changeSearchMode, selectBook, resetBooks } from '@/features/books/booksSlice';
import { loadBooks } from '@/features/books/booksThunks';
import { REQUEST_STATUS } from '@/constants/status';

export const booksRoute: RouteObject = {
  path: 'books',
  lazy: async () => {
    const { BooksPage } = await import('@/components/books/BooksPage');
    return { Component: BooksPage };
  },
  loader: async ({ request }) => {
    const url = new URL(request.url);
    const query = (url.searchParams.get('q') ?? '').trim();
    const modeRaw = url.searchParams.get('mode') as SearchMode;
    const mode: SearchMode = Object.values(SEARCH_MODE).includes(modeRaw)
      ? modeRaw
      : SEARCH_MODE.ALL;
    const book = url.searchParams.get('book');

    const state = store.getState().books;

    // Reset store if query is empty
    if (!query) {
      if (state.lastSearchedQuery || state.request.status !== REQUEST_STATUS.IDLE) {
        store.dispatch(resetBooks());
      }
      return null;
    }

    // Sync input form state with URL search parameters
    if (query !== state.query) store.dispatch(changeQuery(query));
    if (mode !== state.mode) store.dispatch(changeSearchMode(mode));

    const searchParamsChanged =
      query !== state.lastSearchedQuery ||
      mode !== state.lastSearchedMode ||
      state.request.status !== REQUEST_STATUS.SUCCESS;

    let books = state.request.data;

    // Only query the API if search parameters actually changed
    if (searchParamsChanged) {
      const resultAction = await store.dispatch(loadBooks({ query, mode }));
      if (loadBooks.fulfilled.match(resultAction)) {
        books = resultAction.payload;
      } else {
        return null;
      }
    }

    // Immediately reflect the selected book in the address bar if not present
    if (books && books.length > 0) {
      const selectedExists = book ? books.some((b) => b.key === book) : false;
      if (!selectedExists) {
        const firstBookKey = books[0].key;
        store.dispatch(selectBook(firstBookKey));
        url.searchParams.set('book', firstBookKey);
        return replace(`${url.pathname}?${url.searchParams.toString()}`);
      }
    }

    // Ensure selected book key is synced in store
    if (book && book !== store.getState().books.selectedBookKey) {
      store.dispatch(selectBook(book));
    }

    return null;
  },
};
