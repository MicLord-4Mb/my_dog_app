/**
 * Supported search modes for querying the Open Library catalog.
 */
export const SEARCH_MODE = {
  /** Search across all fields (query, author, title, etc.) */
  ALL: 'all',
  /** Filter query strictly by book title */
  TITLE: 'title',
  /** Filter query strictly by author name */
  AUTHOR: 'author',
} as const;

/**
 * Union type representing allowed search modes.
 */
export type SearchMode = (typeof SEARCH_MODE)[keyof typeof SEARCH_MODE];

/**
 * Parameter payload passed to the asynchronous book search thunk and API.
 */
export interface BooksSearchParams {
  /** The text search query string */
  query: string;
  /** Active search filtering mode */
  mode: SearchMode;
}

/**
 * Normalized domain model representing a book item from Open Library.
 */
export interface Book {
  /** Unique Open Library work identifier (e.g., "/works/OL45804W") */
  key: string;
  /** Primary title of the book */
  title: string;
  /** Array of contributing author names */
  authors: string[];
  /** Year of first publication, or null if unknown */
  firstPublishYear: number | null;
  /** URL to the cover thumbnail image, or null if unavailable */
  coverUrl: string | null;
  /** Total number of published editions recorded in Open Library */
  editionCount?: number | null;
  /** Community average rating score out of 5 */
  rating?: number | null;
  /** Categorization subjects or genre tags */
  subjects?: string[];
  /** Short synopsis or first sentence excerpt */
  description?: string | null;
}

/**
 * Parameters used to build an application deep-link URL for the books search route.
 */
export interface BuildBooksSearchUrlParams extends BooksSearchParams {
  /** Optional active book key to deep-link directly to its detail view */
  bookId?: string | null;
}

/**
 * Parsed URL search parameters representing current books view state.
 */
export interface ParsedBooksSearchParams extends BooksSearchParams {
  /** Active book key identifier parsed from URL parameters, or null if none selected */
  bookId: string | null;
  /** Whether non-empty search criteria were provided in the URL */
  hasSearchCriteria: boolean;
}


