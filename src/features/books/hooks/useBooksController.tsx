import { REQUEST_STATUS } from "@/constants/status";
import type { RequestStatus } from "@/constants/status";
import {
  selectBookByKey,
  selectBooksError,
  selectBooksList,
  selectBooksStatus,
} from "@/features/books/booksSelectors";
import { resetBooks } from "@/features/books/booksSlice";
import { loadBooks } from "@/features/books/booksThunks";
import { parseBookSearchParams } from "@/lib/booksUtils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type { ApiError } from "@/types/api.types";
import type { Book, SearchMode } from "@/types/books.types";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";

/**
 * Return contract for the `useBooksController` hook.
 */
export interface BooksControllerReturn {
  /** Current text query draft in the search form input */
  draftQuery: string;
  /** Currently selected search mode in the form dropdown */
  draftMode: SearchMode;
  /** Sets the text query draft value */
  setDraftQuery: (query: string) => void;
  /** Sets the search mode draft value */
  setDraftMode: (mode: SearchMode) => void;

  /** Active book key identifier parsed from URL parameters, or null */
  bookId: string | null;
  /** Array of loaded book items matching the active query */
  books: Book[];
  /** Currently selected Book domain entity or null */
  selectedBook: Book | null;
  /** Request lifecycle status of the books query */
  status: RequestStatus;
  /** Error object if the last request failed */
  error: ApiError | null;
  /** Whether non-empty search criteria were specified in the URL */
  hasSearchCriteria: boolean;

  /** Navigates to a specific book by setting the ?book= parameter in URL */
  handleSelectBook: (key: string) => void;
  /** Commits the search form submission by updating URL query and mode */
  handleSearchSubmit: () => void;
  /** Clears search results, resets Redux state, and empties URL parameters */
  handleReset: () => void;
  /** Retries the last failed search request with current parameters */
  handleRetry: () => void;
}

/**
 * Controller Hook for the `BooksPage` feature.
 *
 * Responsibilities:
 * - Enforces URL as the Single Source of Truth (SSOT) for search parameters and active book.
 * - Synchronizes search form draft inputs with current URL search params.
 * - Dispatches `loadBooks` thunk on URL criteria changes, avoiding duplicate fetches.
 * - Autoselects the first result book if none is selected or selected key is invalid.
 * - Provides clean event handlers for form submission, book selection, reset, and retry.
 *
 * @returns {BooksControllerReturn} State and action handlers for presentation components.
 */
export function useBooksController(): BooksControllerReturn {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL Parse (SSOT)
  const { query, mode, bookId, hasSearchCriteria } = parseBookSearchParams(searchParams);

  // Store Selectors
  const books = useAppSelector(selectBooksList);
  const status = useAppSelector(selectBooksStatus);
  const error = useAppSelector(selectBooksError);
  const selectedBook = useAppSelector((state) => selectBookByKey(state, bookId || null));

  // Form draft state
  const [draftQuery, setDraftQuery] = useState(query);
  const [draftMode, setDraftMode] = useState<SearchMode>(mode);

  // Synchronize draft state when URL params change
  useEffect(() => {
    setDraftQuery(query);
    setDraftMode(mode);
  }, [query, mode]);

  const prevSearchRef = useRef<{ query: string; mode: SearchMode } | null>(null);

  // Monitor query and mode changes to trigger thunk fetch
  useEffect(() => {
    if (!hasSearchCriteria) {
      prevSearchRef.current = null;
      return;
    }

    const prev = prevSearchRef.current;
    if (prev && prev.query === query && prev.mode === mode) {
      return;
    }

    prevSearchRef.current = { query, mode };
    dispatch(loadBooks({ query, mode }));
  }, [dispatch, query, mode, hasSearchCriteria]);

  // Autoselect first book in results if none or invalid book is selected
  useEffect(() => {
    if (status !== REQUEST_STATUS.SUCCESS || books.length === 0) return;

    const currentBookExist = Boolean(selectedBook);
    if (!bookId || !currentBookExist) {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set('book', books[0].key);
          return next;
        },
        { replace: true }
      );
    }
  }, [status, books, bookId, selectedBook, setSearchParams]);

  /**
   * Sets the active selected book in URL query params.
   */
  const handleSelectBook = useCallback(
    (key: string) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set('book', key);
        return next;
      });
    },
    [setSearchParams]
  );

  /**
   * Commits the current draft query and mode to the URL search params.
   */
  const handleSearchSubmit = useCallback(() => {
    const trQuery = draftQuery.trim().toLowerCase();
    if (!trQuery) return;

    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('q', trQuery.trim());
      next.set('mode', draftMode);
      next.delete('book');
      return next;
    });
  }, [draftQuery, draftMode, setSearchParams]);

  /**
   * Resets the search form, clears Redux store, and wipes URL query params.
   */
  const handleReset = useCallback(() => {
    setDraftQuery('');
    prevSearchRef.current = null;
    dispatch(resetBooks());
    setSearchParams({}, { replace: true });
  }, [dispatch, setSearchParams]);

  /**
   * Retries fetching books using the current active query and mode.
   */
  const handleRetry = useCallback(() => {
    if (query) {
      dispatch(loadBooks({ query, mode }));
    }
  }, [dispatch, query, mode]);

  return {
    // Form state
    draftQuery,
    draftMode,
    setDraftQuery,
    setDraftMode,

    // Data & state
    bookId,
    books,
    selectedBook,
    status,
    error,
    hasSearchCriteria,

    // Action handlers
    handleSelectBook,
    handleSearchSubmit,
    handleReset,
    handleRetry,
  };
}
