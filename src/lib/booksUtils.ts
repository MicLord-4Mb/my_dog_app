import {ROUTES} from "@/constants/routes";
import {
  type BuildBooksSearchUrlParams,
  type ParsedBooksSearchParams,
  SEARCH_MODE,
  type SearchMode
} from "@/types/books.types";

const validSearchModes = new Set<string>(Object.values(SEARCH_MODE))

export function isValidSearchMode(value: unknown): value is SearchMode  {
  return typeof value === 'string' && validSearchModes.has(value);
}

export function isValidBookKey(value: unknown): value is string {
  if (typeof value !== 'string') return false;

  // Open Library book keys -> "/works/OL12345W" or "OL12345W"
  const trValue=value.trim();
  return trValue.length > 0 && (trValue.startsWith('/works/') || trValue.startsWith('OL') );
}

export function parseBookSearchParams ( searchParams: URLSearchParams): ParsedBooksSearchParams {
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

// Quick and Dirty - fix for prod
export function buildBooksSearchUrl(
  { query, mode = SEARCH_MODE.ALL, bookId }:BuildBooksSearchUrlParams
):string {
  const params = new URLSearchParams();
  const trQuery = query.trim().toLowerCase();

  if (trQuery) {
    params.set("q", trQuery);
  }
  if (mode && mode !== SEARCH_MODE.ALL) {
    params.set("mode", mode);
  }
  if (bookId) {
    params.set("bookId", bookId);
  }

  const queryString = params.toString()
  return queryString ? `${ROUTES.SEARCH}?${queryString}` : `${ROUTES.SEARCH}`;
}
