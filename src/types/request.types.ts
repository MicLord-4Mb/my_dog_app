import {REQUEST_STATUS} from "@/constants/status";
import type {ApiError} from "@/types/api.types";

/**
 * Strongly typed discriminated union representing asynchronous request states.
 */
export type RequestState<T, E = ApiError> =
  | { status: typeof REQUEST_STATUS.IDLE; data: null; error: null }
  | { status: typeof REQUEST_STATUS.LOADING; data: null; error: null }
  | { status: typeof REQUEST_STATUS.SUCCESS; data: T; error: null }
  | { status: typeof REQUEST_STATUS.ERROR; data: null; error: E };
