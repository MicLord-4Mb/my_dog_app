import {REQUEST_STATUS} from "@/constants/status";
import {selectBookByKey, selectBooksList, selectBooksStatus, selectSelectedBook} from "@/features/books/booksSelectors";
import {loadBooks} from "@/features/books/booksThunks";
import {parseBookSearchParams} from "@/lib/booksUtils";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import type {SearchMode} from "@/types/books.types";
import {useCallback, useEffect, useRef} from "react";
import {useSearchParams} from "react-router";


export function useBooksController() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL Parse (SSOT)
  const { query, mode, bookId, hasSearchCriteria } = parseBookSearchParams(searchParams);

  // get store data
  const books = useAppSelector(selectBooksList);
  const status = useAppSelector(selectBooksStatus);
  const selectedBook = useAppSelector((state) => selectBookByKey(state, bookId || null));

  const prevSearchRef = useRef<{ query: string; mode: SearchMode } | null>(null);

  // query and mode monitoring for changes
  useEffect(() => {
    if (!hasSearchCriteria) return;

    const prev = prevSearchRef.current;
    if (prev && prev.query === query && prev.mode === mode) {
      return;
    }

    prevSearchRef.current = { query, mode };
    dispatch(loadBooks({ query, mode }));
  }, [dispatch, query, mode, hasSearchCriteria]);

  // quick & dirty - checkout code -> book select in list logic
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

  const handleSearchSubmit = useCallback(
    (newQuery: string, newMode: SearchMode) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set('q', newQuery.trim());
        next.set('mode', newMode);
        next.delete('book');
        return next;
      });
    }, [setSearchParams]
  );

  return {
    query,
    mode,
    bookId,
    books,
    selectedBook,
    status,
    hasSearchCriteria,
    handleSelectBook,
    handleSearchSubmit,
  };
}
