/**
 * Typed API error response.
 */
export interface ApiError {
  /** Error message */
  message: string;
  /** Optional HTTP status code */
  code?: number;
}
