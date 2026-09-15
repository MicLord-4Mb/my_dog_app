import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { Loader2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { REQUEST_STATUS } from '@/constants/status';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import { changeQuery, changeSearchMode, selectBook } from '@/features/books/booksSlice';
import { loadBooks } from '@/features/books/booksThunks';
import {
  selectBooksQuery,
  selectBooksMode,
  selectBooksStatus,
  selectBooksError,
  selectBooksList,
  selectSelectedBookKey,
  selectSelectedBook,
} from '@/features/books/booksSelectors';
import { BookSearchForm } from '@/components/books/BookSearchForm';
import { BookList } from '@/components/books/BookList';
import { BookCard } from '@/components/books/BookCard';
import type { SearchMode } from '@/types/books.types';

const STYLES = {
  container: 'relative w-full max-w-container-max mx-auto px-4 md:px-8 pt-6 pb-12 overflow-hidden',
  ambientGlow1: 'absolute -top-24 right-1/4 w-96 h-96 bg-primary-fixed/30 rounded-full blur-3xl pointer-events-none -z-10',
  ambientGlow2: 'absolute top-1/2 -left-20 w-80 h-80 bg-surface-container-high/40 rounded-full blur-3xl pointer-events-none -z-10',

  headerSection: 'mb-8',
  headerBadgeRow: 'flex flex-wrap items-center gap-2 mb-2',
  headerRow: 'flex flex-col md:flex-row md:items-end justify-between gap-4',
  heading: 'font-headline text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight',
  subheading: 'text-lg text-secondary max-w-2xl mt-1',

  searchSection: 'mb-8',

  loadingBox: 'w-full flex flex-col items-center justify-center py-16 gap-3',
  loadingText: 'text-on-surface-variant font-medium',

  resultsGrid: 'grid grid-cols-1 lg:grid-cols-12 gap-8 items-start',
};



export const BooksPage = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = useAppSelector(selectBooksQuery);
  const mode = useAppSelector(selectBooksMode);
  const status = useAppSelector(selectBooksStatus);
  const error = useAppSelector(selectBooksError);
  const books = useAppSelector(selectBooksList);
  const selectedBookKey = useAppSelector(selectSelectedBookKey);
  const selectedBook = useAppSelector(selectSelectedBook);

  const urlBook = searchParams.get('book');
  useEffect(() => {
    if (urlBook && urlBook !== selectedBookKey) {
      dispatch(selectBook(urlBook));
    }
  }, [urlBook, selectedBookKey, dispatch]);

  const handleSubmit = () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setSearchParams({ q: trimmed, mode });
  };

  const handleReset = () => {
    setSearchParams({});
  };

  const handleQueryChange = (next: string) => {
    dispatch(changeQuery(next));
  };

  const handleModeChange = (next: SearchMode) => {
    dispatch(changeSearchMode(next));
  };

  const handleSelectBook = (key: string) => {
    dispatch(selectBook(key));
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('book', key);
      return next;
    });
  };

  const handleRetry = () => {
    void dispatch(loadBooks({ query, mode }));
  };

  const resultsCount = books ? books.length : null;

  return (
    <div className={STYLES.container}>
      {/* Ambient Backdrop Glows */}
      <div className={STYLES.ambientGlow1} />
      <div className={STYLES.ambientGlow2} />

      {/* Header Section */}
      <header className={STYLES.headerSection}>
        <div className={STYLES.headerBadgeRow}>
          <Badge variant="default" className="gap-1 tracking-wide uppercase font-semibold text-xs">
            <span className="material-symbols-outlined text-[14px]">auto_stories</span>
            Curated Knowledge • Open Library
          </Badge>
        </div>
        <div className={STYLES.headerRow}>
          <div>
            <h1 className={STYLES.heading}>Search & Discover Books</h1>
            <p className={STYLES.subheading}>
              Search through the catalog by title, author, or keyword.
            </p>
          </div>
        </div>
      </header>

      {/* Search Form */}
      <div className={STYLES.searchSection}>
        <BookSearchForm
          query={query}
          mode={mode}
          isLoading={status === REQUEST_STATUS.LOADING}
          resultsCount={resultsCount}
          onQueryChange={handleQueryChange}
          onModeChange={handleModeChange}
          onSubmit={handleSubmit}
          onReset={handleReset}
        />
      </div>

      {/* State-dependent content */}
      {status === REQUEST_STATUS.IDLE && (
        <EmptyState
          icon="search"
          title="Ready to explore"
          description="Enter a search query and choose a search mode to discover books."
        />
      )}

      {status === REQUEST_STATUS.LOADING && (
        <div className={STYLES.loadingBox}>
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className={STYLES.loadingText}>Searching Open Library...</p>
        </div>
      )}

      {status === REQUEST_STATUS.ERROR && error && (
        <ErrorState
          title="Search Failed"
          message={error.message}
          onRetry={handleRetry}
        />
      )}

      {status === REQUEST_STATUS.SUCCESS && books && books.length === 0 && (
        <EmptyState
          icon="search_off"
          title="No books found"
          description="Try another search query or change the mode."
        />
      )}

      {books && books.length > 0 && (
        <section className={STYLES.resultsGrid}>
          <BookList
            books={books}
            selectedBookKey={selectedBookKey}
            onSelect={handleSelectBook}
          />
          {selectedBook && <BookCard book={selectedBook} />}
        </section>
      )}
    </div>
  );
};
