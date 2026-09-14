import type {Book} from "@/types/books.types";
import type {OpenLibraryBookDto} from "@/api/dto/libBook.dto";

export const mapOpenLibraryBookDtoToDomain = ( dto: OpenLibraryBookDto ):Book => {
  return {
    key: dto.key ?? crypto.randomUUID(),
    title: dto.title ?? "untitled book",
    authors: dto.author_name ?? [],
    firstPublishYear: dto.first_publish_year ?? null,
    coverUrl: dto.cover_i ? `https://covers.openlibrary.org/b/id/${dto.cover_i}-M.jpg` : null,
  }
}
