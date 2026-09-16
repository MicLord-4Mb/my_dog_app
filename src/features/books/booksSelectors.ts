import { booksAdapter } from "@/features/books/booksSlice";
import type { RootState } from '@/store';
import type { Book } from "@/types/books.types";
import type { RequestStatus } from "@/constants/status";
import type { ApiError } from "@/types/api.types";
import type { RequestState } from "@/types/request.types";
import type { EntityState } from "@reduxjs/toolkit";

/**
 * Root request lifecycle selector extracting the books request state.
 *
 * @param {RootState} state - Root Redux store state.
 * @returns {RequestState<EntityState<Book, string>>} Async lifecycle state.
 */
export const selectBooksRequest = (
  state: RootState
): RequestState<EntityState<Book, string>> => state.books.request;

/**
 * Selector extracting the current books query status (IDLE, LOADING, SUCCESS, ERROR).
 *
 * @param {RootState} state - Root Redux store state.
 * @returns {RequestStatus} Current request status.
 */
export const selectBooksStatus = (state: RootState): RequestStatus =>
  state.books.request.status;

/**
 * Selector extracting any API error associated with the books request.
 *
 * @param {RootState} state - Root Redux store state.
 * @returns {ApiError | null} Error object or null.
 */
export const selectBooksError = (state: RootState): ApiError | null =>
  state.books.request.error;

/**
 * Referential fallback for initial entity state to prevent re-render cascades.
 */
const initialBooksEntityState = booksAdapter.getInitialState();

/**
 * Entity adapter selector bundle scoped to `state.books.request.data`.
 * Falls back to a stable empty entity state when data has not yet loaded.
 */
export const booksAdapterSelectors = booksAdapter.getSelectors<RootState>(
  (state) => state.books.request.data ?? initialBooksEntityState
);

/**
 * Memoized selector: Reconstructs an ordered array of all `Book` entities in relevance order.
 *
 * @param {RootState} state - Root Redux store state.
 * @returns {Book[]} Array of domain book entities.
 */
export const selectBooksList = booksAdapterSelectors.selectAll;

/**
 * Selector extracting the normalized dictionary mapping book keys to `Book` entities.
 *
 * @param {RootState} state - Root Redux store state.
 * @returns {Record<string, Book>} Dictionary of entities indexed by key.
 */
export const selectBookEntities = booksAdapterSelectors.selectEntities;

/**
 * Selector extracting an ordered array of all book key identifiers.
 *
 * @param {RootState} state - Root Redux store state.
 * @returns {string[]} Array of book keys.
 */
export const selectBookIds = booksAdapterSelectors.selectIds;

/**
 * Entity selector returning a single `Book` entity by its key identifier.
 *
 * @param {RootState} state - Root Redux store state.
 * @param {string} id - Book key identifier.
 * @returns {Book | undefined} The matching book entity or undefined.
 */
export const selectBookById = booksAdapterSelectors.selectById;

/**
 * High-performance O(1) dictionary selector to retrieve a book by key,
 * returning null if not found or if the key is null.
 *
 * @param {RootState} state - Root Redux store state.
 * @param {string | null} key - Unique Open Library key.
 * @returns {Book | null} Active book entity or null.
 */
export const selectBookByKey = (state: RootState, key: string | null): Book | null => {
  if (!key) return null;
  return booksAdapterSelectors.selectById(state, key) ?? null;
};
