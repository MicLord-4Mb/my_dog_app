/**
 * Asynchronous request lifecycle statuses.
 */
export const REQUEST_STATUS = {
  /** Initial idle state */
  IDLE: 'idle',
  /** Request is actively fetching */
  LOADING: 'loading',
  /** Request resolved successfully */
  SUCCESS: 'success',
  /** Request failed with error */
  ERROR: 'error',
} as const;

/**
 * Union type representing the possible states of an asynchronous request.
 */
export type RequestStatus = (typeof REQUEST_STATUS)[keyof typeof REQUEST_STATUS];
