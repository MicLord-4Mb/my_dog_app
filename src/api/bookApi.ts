import { mapOpenLibraryBookDtoToDomain } from "@/api/mappers/libBook.mapper";
import type { OpenLibrarySearchResponse } from "@/types/api.types";
import axios from "axios";
import {
  type Book,
  type BooksSearchParams,
  SEARCH_MODE,
  type SearchMode,
} from '@/types/books.types';

/**
 * Pre-configured Axios instance for Open Library REST API requests.
 */
const bookApi = axios.create({
  baseURL: 'https://openlibrary.org',
  timeout: 5000,
});

/**
 * Constructs Open Library search query parameters based on active search mode.
 *
 * @param {string} query - Cleaned search query string.
 * @param {SearchMode} mode - Targeted search field mode (all, title, author).
 * @returns {Record<string, string | number>} Query parameter dictionary for the request.
 */
function buildSearchParams(query: string, mode: SearchMode): Record<string, string | number> {
  const trQuery = query.trim();
  const params: Record<string, string | number> = {
    limit: 15,
    fields: 'key,author_name,title,first_publish_year,cover_i,edition_count,ratings_average,subject,first_sentence',
  };

  if (mode === SEARCH_MODE.TITLE) {
    params.title = trQuery;
    return params;
  }
  if (mode === SEARCH_MODE.AUTHOR) {
    params.author = trQuery;
    return params;
  }

  params.q = trQuery;
  return params;
}

/**
 * Queries Open Library search endpoint and returns normalized domain `Book` models.
 *
 * @param {BooksSearchParams} params - Search query and filtering mode.
 * @returns {Promise<Book[]>} Array of mapped domain book entities.
 * @throws {Error} When query is empty or network request fails.
 */
export async function searchBooks(params: BooksSearchParams): Promise<Book[]> {
  const trQuery = params.query.trim();
  if (!trQuery) {
    throw new Error("no title or authors or keyword");
  }

  const response = await bookApi.get<OpenLibrarySearchResponse>('/search.json', {
    params: buildSearchParams(trQuery, params.mode),
  });

  return response.data.docs.map(mapOpenLibraryBookDtoToDomain);
}

