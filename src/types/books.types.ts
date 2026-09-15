export const SEARCH_MODE = {
    ALL: 'all',
    TITLE: 'title',
    AUTHOR: 'author',
} as const;

export type SearchMode = (typeof SEARCH_MODE)[keyof typeof SEARCH_MODE];

export interface BooksSearchParams {
    query: string;
    mode: SearchMode;
}

export type Book = {
    key: string;
    title: string;
    authors: string[];
    firstPublishYear: number|null;
    coverUrl: string|null;
    editionCount?: number|null;
    rating?: number|null;
    subjects?: string[];
    description?: string|null;
}

export interface BuildBooksSearchUrlParams extends BooksSearchParams {
    bookId?: string|null;
}

export interface ParsedBooksSearchParams extends BuildBooksSearchUrlParams {
    hasSearchCriteria: boolean;
}
