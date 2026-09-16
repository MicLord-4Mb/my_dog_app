import React from 'react';
import { useBooksController } from "@/features/books/hooks/useBooksController";
import { Loader2 } from 'lucide-react';
import { REQUEST_STATUS } from '@/constants/status';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import { BookSearchForm } from '@/components/books/BookSearchForm';
import { BookList } from '@/components/books/BookList';
import { BookCard } from '@/components/books/BookCard';

const STYLES = {
  container: 'relative w-full max-w-container-max mx-auto px-4 md:px-8 pt-6 pb-12 overflow-hidden',
  ambientGlow1: 'absolute -top-24 right-1/4 w-96 h-96 bg-primary-fixed/30 rounded-full blur-3xl pointer-events-none -z-10',
  ambientGlow2: 'absolute top-1/2 -left-20 w-80 h-80 bg-surface-container-high/40 rounded-full blur-3xl pointer-events-none -z-10',

  headerSection: 'mb-8',
  headerBadgeRow: 'flex flex-wrap items-center gap-2 mb-2',
  headerBadge: 'gap-1 tracking-wide uppercase font-semibold text-xs',
  headerBadgeIcon: 'material-symbols-outlined text-[14px]',
  headerRow: 'flex flex-col md:flex-row md:items-end justify-between gap-4',
  heading: 'font-headline text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight',
  subheading: 'text-lg text-secondary max-w-2xl mt-1',

  searchSection: 'mb-8',

  loadingBox: 'w-full flex flex-col items-center justify-center py-16 gap-3',
  loadingSpinner: 'w-10 h-10 text-primary animate-spin',
  loadingText: 'text-on-surface-variant font-medium',

  resultsGrid: 'grid grid-cols-1 lg:grid-cols-12 gap-8 items-start',
};

/**
 * Main feature page for book search and catalog discovery.
 *
 * Architecture:
 * - Pure presentational view following the Controller Hook pattern (`useBooksController`).
 * - Encapsulates all style definitions at the top in `STYLES`.
 * - Handles IDLE, LOADING, ERROR, EMPTY, and SUCCESS visual states declaratively.
 * - Renders Master-Detail view (`BookList` + `BookCard`) upon receiving results.
 *
 * @returns {React.JSX.Element} The rendered books catalog page.
 */
export const BooksPage: React.FC = () => {
  const {
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
  } = useBooksController();

  const resultsCount = books && books.length > 0 ? books.length : null;

  return (
    <div className={STYLES.container}>
      {/* Ambient Backdrop Glows */}
      <div className={STYLES.ambientGlow1} />
      <div className={STYLES.ambientGlow2} />

      {/* Header Section */}
      <header className={STYLES.headerSection}>
        <div className={STYLES.headerBadgeRow}>
          <Badge variant="default" className={STYLES.headerBadge}>
            <span className={STYLES.headerBadgeIcon}>auto_stories</span>
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
          query={draftQuery}
          mode={draftMode}
          isLoading={status === REQUEST_STATUS.LOADING}
          resultsCount={resultsCount}
          onQueryChange={setDraftQuery}
          onModeChange={setDraftMode}
          onSubmit={handleSearchSubmit}
          onReset={handleReset}
        />
      </div>

      {/* State-dependent content */}
      {!hasSearchCriteria && status === REQUEST_STATUS.IDLE && (
        <EmptyState
          icon="search"
          title="Ready to explore"
          description="Enter a search query and choose a search mode to discover books."
        />
      )}

      {status === REQUEST_STATUS.LOADING && (
        <div className={STYLES.loadingBox}>
          <Loader2 className={STYLES.loadingSpinner} />
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
            selectedBookKey={bookId}
            onSelect={handleSelectBook}
          />
          {selectedBook && <BookCard book={selectedBook} />}
        </section>
      )}
    </div>
  );
};
