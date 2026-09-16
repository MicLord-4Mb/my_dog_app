import type { Book } from "@/types/books.types";
import type { OpenLibraryBookDto } from "@/api/dto/libBook.dto";

/**
 * Transforms raw Open Library DTO response into clean domain `Book` entity.
 * Handles missing fields, constructs cover image URLs, and provides safe fallbacks.
 *
 * @param {OpenLibraryBookDto} dto - Raw API document object.
 * @returns {Book} Normalized domain book model.
 */
export const mapOpenLibraryBookDtoToDomain = (dto: OpenLibraryBookDto): Book => {
  return {
    key: dto.key ?? crypto.randomUUID(),
    title: dto.title ?? "untitled book",
    authors: dto.author_name ?? [],
    firstPublishYear: dto.first_publish_year ?? null,
    coverUrl: dto.cover_i ? `https://covers.openlibrary.org/b/id/${dto.cover_i}-M.jpg` : null,
    editionCount: dto.edition_count ?? null,
    rating: dto.ratings_average ?? null,
    subjects: dto.subject ?? [],
    description: dto.first_sentence?.[0] ?? null,
  };
};


