/**
 * External REST API endpoints (TheDogAPI).
 */
export const API_ENDPOINTS = {
  /** Fetch complete dog breeds catalog */
  BREEDS: '/breeds',
  /** Search and fetch dog images */
  IMAGES_SEARCH: '/images/search',
} as const;

export type ApiEndpoint = (typeof API_ENDPOINTS)[keyof typeof API_ENDPOINTS];
