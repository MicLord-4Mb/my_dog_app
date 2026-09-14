import type {Book, RequestStatus, SearchMode} from "../../types/booksTypes.ts";

export const CHANGE_QUERY = "books/changeQuery";
export const CHANGE_SEARCH_MODE = "books/changeSearchMode";
export const SEARCH_BOOKS_LOADING = "books/searchLoading";
export const SEARCH_BOOKS_SUCCESS = "books/searchSuccess";
export const SEARCH_BOOKS_ERROR = "books/searchError";
export const SELECT_BOOK = "books/selectBook";
export const RESET_BOOKS = "books/resetBooks";

export type BookState = {
    query: string;
    mode: SearchMode;
    status: RequestStatus;
    items: Book[];
    selectedBookKey: string | null;
    error: string | null;
}

export type ChangeQueryAction = {
    type: typeof CHANGE_QUERY;
    payload: string;
}

export type SearchBooksLoadingAction = {
    type: typeof SEARCH_BOOKS_LOADING;

}
export type ChangeSearchModeAction = {
    type: typeof CHANGE_SEARCH_MODE;
    payload: SearchMode;
}
export type SearchBooksSuccessAction = {
    type: typeof SEARCH_BOOKS_SUCCESS;
    payload: Book[];
}

export type SearchBooksErrorAction = {
    type: typeof SEARCH_BOOKS_ERROR;
    payload: string;
}

export type SelectBookAction = {
    type: typeof SELECT_BOOK;
    payload: string;
}
export type ResetBookAction = {
    type: typeof RESET_BOOKS;

}

export type BooksAction =
    | ChangeQueryAction
    | SearchBooksLoadingAction
    | ChangeSearchModeAction
    | SearchBooksSuccessAction
    | SearchBooksErrorAction
    | SelectBookAction
    | ResetBookAction


export function changeQueryAction(query: string): ChangeQueryAction {
    return {
        type: CHANGE_QUERY,
        payload: query
    }
}
export function changeSearchModeAction(mode: SearchMode): ChangeSearchModeAction {
    return {
        type: CHANGE_SEARCH_MODE,
        payload: mode
    }
}

export function searchBooksLoadingAction(): SearchBooksLoadingAction {
    return {
        type: SEARCH_BOOKS_LOADING
    }
}

export function searchBooksSuccessAction(books: Book[]): SearchBooksSuccessAction {
    return {
        type: SEARCH_BOOKS_SUCCESS,
        payload: books
    }
}

export function searchBooksErrorAction(message: string): SearchBooksErrorAction {
    return {
        type: SEARCH_BOOKS_ERROR,
        payload: message
    }
}

export function selectBookAction(bookKey: string): SelectBookAction {
    return {
        type: SELECT_BOOK,
        payload: bookKey
    }
}

export function resetBooksAction(): ResetBookAction {
    return {
        type: RESET_BOOKS,
    }
}