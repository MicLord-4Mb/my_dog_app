import {SEARCH_MODE, type SearchMode} from "@/types/books.types";

const validSearchModes = new Set<string>(Object.values(SEARCH_MODE))

export function isValidSearchMode(value: unknown): value is SearchMode  {
  return typeof value === 'string' && validSearchModes.has(value);
}