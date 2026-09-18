/**
 * Raw Data Transfer Object for a book entity returned from Open Library search API.
 * Contains optional fields since the Open Library data can be sparse or inconsistent.
 */
export type OpenLibraryBookDto = {
  /** Unique key identifier for the book/work */
  key?: string;
  /** Primary title of the book */
  title?: string;
  /** Array of contributing author names */
  author_name?: string[];
  /** Year the book was first published */
  first_publish_year?: number;
  /** Identifier for the cover image */
  cover_i?: number;
  /** Number of different editions available */
  edition_count?: number;
  /** Average user rating */
  ratings_average?: number;
  /** Associated subjects or genres */
  subject?: string[];
  /** The first sentence of the book's description or text */
  first_sentence?: string[];
}
