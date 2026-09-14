import type {OpenLibraryBookDto} from "@/api/dto/libBook.dto";

/**
 * Typed API error response.
 */
export interface ApiError {
  /** Error message */
  message: string;
  /** Optional HTTP status code */
  code?: number;
}

export type OpenLibrarySearchResponse  = {
  numFound: number;
  docs: OpenLibraryBookDto[];
}
