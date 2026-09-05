import { REQUEST_STATUS, type RequestStatus } from '@/constants/status';

/**
 * Typed API error response.
 */
export interface ApiError {
  /** Error message */
  message: string;
  /** Optional HTTP status code */
  code?: number;
}

export type { RequestStatus };
export { REQUEST_STATUS };

/**
 * Strongly typed discriminated union representing asynchronous request states.
 */
export type RequestState<T, E = ApiError> =
  | { status: typeof REQUEST_STATUS.IDLE; data: null; error: null }
  | { status: typeof REQUEST_STATUS.LOADING; data: null; error: null }
  | { status: typeof REQUEST_STATUS.SUCCESS; data: T; error: null }
  | { status: typeof REQUEST_STATUS.ERROR; data: null; error: E };
