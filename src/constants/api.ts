/**
 * External REST API endpoints (TheDogAPI).
 */
export const API_ENDPOINTS = {
  /** Fetch complete dog breeds catalog */
  BREEDS: '/breeds',
} as const;

export type ApiEndpoint = (typeof API_ENDPOINTS)[keyof typeof API_ENDPOINTS];
