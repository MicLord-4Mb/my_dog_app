// export type RequestStatus = 'success' | 'idle' | 'loading' | 'error';

export type SearchMode = 'all'|'title'|'author';

export type BookSearchParams = {
    query: string;
    mode: SearchMode;
}

export type Book = {
    key: string;
    title: string;
    authors: string[];
    firstPublishYear: number|null;
    coverUrl: string|null;
}
