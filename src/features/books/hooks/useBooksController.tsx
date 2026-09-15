import {REQUEST_STATUS} from "@/constants/status";
import {
  selectBookByKey,
  selectBooksError,
  selectBooksList,
  selectBooksStatus,
} from "@/features/books/booksSelectors";
import {resetBooks} from "@/features/books/booksSlice";
import {loadBooks} from "@/features/books/booksThunks";
import {parseBookSearchParams} from "@/lib/booksUtils";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import type {SearchMode} from "@/types/books.types";
import {useCallback, useEffect, useRef, useState} from "react";
import {useSearchParams} from "react-router";


export function useBooksController() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL Parse (SSOT)
  const { query, mode, bookId, hasSearchCriteria } = parseBookSearchParams(searchParams);

  // get store data
  const books = useAppSelector(selectBooksList);
  const status = useAppSelector(selectBooksStatus);
  const error = useAppSelector(selectBooksError);
  const selectedBook = useAppSelector((state) => selectBookByKey(state, bookId || null));

  // Draft for submit form
  const [draftQuery, setDraftQuery] = useState(query);
  const [draftMode, setDraftMode] = useState<SearchMode>(mode);

  // synchronization of URLs and search parameters
  useEffect(() => {
    setDraftQuery(query);
    setDraftMode(mode);
  }, [query, mode]);

  const prevSearchRef = useRef<{ query: string; mode: SearchMode } | null>(null);

  // query and mode monitoring for changes
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

  // quick & dirty - checkout code -> book autoselect in list logic
  useEffect(() => {
    if (status !== REQUEST_STATUS.SUCCESS || books.length === 0) return;

    const currentBookExist = books.some((b) => b.key === bookId);
    if (!bookId || !currentBookExist) {
      setSearchParams(( prev) => {
          const next = new URLSearchParams(prev);
          next.set('book', books[0].key);
          return next;
          },
        { replace: true }
      );
    }
  }, [status, books, bookId, setSearchParams]);

  const handleSelectBook = useCallback(
    (key: string) => {
      setSearchParams(( prev) => {
        const next = new URLSearchParams(prev);
        next.set('book', key);
        return next;
      });
    }, [setSearchParams]
  );

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
    }, [draftQuery, draftMode, setSearchParams]
  );

  const handleReset = useCallback(()=> {
    setDraftQuery('');
    prevSearchRef.current = null;
    dispatch(resetBooks());
    setSearchParams({}, { replace: true });
  }, [dispatch, setSearchParams]);

  const handleRetry = useCallback(()=> {
    if (query) {
      dispatch(loadBooks({ query, mode }));
    }
  }, [dispatch, query, mode]);

  return {
    // for the form
    draftQuery,
    draftMode,
    setDraftQuery,
    setDraftMode,

    // data & state
    bookId,
    books,
    selectedBook,
    status,
    error,
    hasSearchCriteria,

    // handle function
    handleSelectBook,
    handleSearchSubmit,
    handleReset,
    handleRetry,
  };
}
