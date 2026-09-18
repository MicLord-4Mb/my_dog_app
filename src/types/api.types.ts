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

/**
 * Response structure for Open Library search API.
 */
export type OpenLibrarySearchResponse  = {
  /** Total number of found items matching the search */
  numFound: number;
  /** Array of book documents matching the search criteria */
  docs: OpenLibraryBookDto[];
}
