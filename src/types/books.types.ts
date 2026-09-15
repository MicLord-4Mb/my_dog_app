// export type RequestStatus = 'success' | 'idle' | 'loading' | 'error';

export const SEARCH_MODE = {
    ALL: 'all',
    TITLE: 'title',
    AUTHOR: 'author',
} as const;

export type SearchMode = (typeof SEARCH_MODE)[keyof typeof SEARCH_MODE];

export type BookSearchParams = {
    query: string;
    mode: SearchMode;
}

export type Book = {
    key: string;
    title: string;
    authors: string[];
    firstPublishYear: number | null;
    coverUrl: string | null;
    editionCount?: number | null;
    rating?: number | null;
    subjects?: string[];
    description?: string | null;
}
