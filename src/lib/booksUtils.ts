import { ROUTES } from "@/constants/routes";
import {
  type BuildBooksSearchUrlParams,
  type ParsedBooksSearchParams,
  SEARCH_MODE,
  type SearchMode,
} from "@/types/books.types";

const validSearchModes = new Set<string>(Object.values(SEARCH_MODE));

/**
 * Type guard validating whether an unknown value corresponds to a valid `SearchMode`.
 *
 * @param {unknown} value - Candidate value to test.
 * @returns {boolean} True if the value is a known search mode.
 */
export function isValidSearchMode(value: unknown): value is SearchMode {
  return typeof value === 'string' && validSearchModes.has(value);
}

/**
 * Type guard validating whether an unknown value conforms to an Open Library work identifier format.
 *
 * @param {unknown} value - Candidate key string.
 * @returns {boolean} True if value is non-empty and starts with `/works/` or `OL`.
 */
export function isValidBookKey(value: unknown): value is string {
  if (typeof value !== 'string') return false;

  const trValue = value.trim();
  return trValue.length > 0 && (trValue.startsWith('/works/') || trValue.startsWith('OL'));
}

/**
 * Parses URL search query parameters into a strongly-typed search parameters model.
 * Enforces URL as the Single Source of Truth (SSOT).
 *
 * @param {URLSearchParams} searchParams - Current location search parameters from React Router.
 * @returns {ParsedBooksSearchParams} Cleaned and validated query parameters.
 */
export function parseBookSearchParams(searchParams: URLSearchParams): ParsedBooksSearchParams {
  const rawQ = searchParams.get("q") ?? '';
  const query = rawQ.trim();

  const rawMode = searchParams.get("mode");
  const mode = isValidSearchMode(rawMode) ? rawMode : SEARCH_MODE.ALL;

  const rawBook = searchParams.get("book");
  const bookId = isValidBookKey(rawBook) ? rawBook.trim() : null;

  return {
    query,
    mode,
    bookId,
    hasSearchCriteria: query.length > 0,
  };
}

/**
 * Composes a full application route URL with encoded search query parameters.
 *
 * @param {BuildBooksSearchUrlParams} params - Search query, mode, and optional selected book key.
 * @returns {string} Fully qualified relative URL path for navigation.
 */
export function buildBooksSearchUrl({
  query,
  mode = SEARCH_MODE.ALL,
  bookId,
}: BuildBooksSearchUrlParams): string {
  const params = new URLSearchParams();
  const trQuery = query.trim().toLowerCase();

  if (trQuery) {
    params.set("q", trQuery);
  }
  if (mode && mode !== SEARCH_MODE.ALL) {
    params.set("mode", mode);
  }
  if (bookId) {
    params.set("book", bookId);
  }

  const queryString = params.toString();
  return queryString ? `${ROUTES.SEARCH}?${queryString}` : `${ROUTES.SEARCH}`;
}

