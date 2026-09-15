/**
 * External REST API endpoints.
 */
export const API_ENDPOINTS = {
  /** Fetch complete dog breeds catalog */
  BREEDS: '/breeds',
  /** Search books by query and mode */
  BOOKS: '/search.json',
} as const;

export type ApiEndpoint = (typeof API_ENDPOINTS)[keyof typeof API_ENDPOINTS];
