import {mapOpenLibraryBookDtoToDomain} from "@/api/mappers/libBook.mapper";
import type {OpenLibrarySearchResponse} from "@/types/api.types";
import axios from "axios";
import type {
    Book,
    BookSearchParams,
    SearchMode
} from '@/types/books.types';


const bookApi= axios.create({
    baseURL: 'https://openlibrary.org',
    timeout: 5000,
})

function buildSearchParams(query: string, mode: SearchMode): Record<string, string|number> {
    const trQuery = query.trim();
    const params: Record<string, string|number> = {
        limit: 15,
        fields: 'key,author_name,title,first_publish_year,cover_i,edition_count,ratings_average,subject,first_sentence'
    };
    if (mode === "title"){
        params.title = trQuery;
        return params;
    }
    if (mode === "author"){
        params.author = trQuery;
        return params;
    }
    params.q = trQuery;
    return params;
}

export async function searchBooks(params: BookSearchParams): Promise<Book[]> {
    const trQuery = params.query.trim();
    if (!trQuery) {
        throw new Error("no title or authors or keyword");
    }
    const response =
        await bookApi.get<OpenLibrarySearchResponse>('/search.json',{
            params: buildSearchParams(trQuery, params.mode)
        })

    return response.data.docs.map(mapOpenLibraryBookDtoToDomain)
}
