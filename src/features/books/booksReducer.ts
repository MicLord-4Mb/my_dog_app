import {
    type BooksAction,
    type BookState,
    CHANGE_QUERY,
    CHANGE_SEARCH_MODE,
    RESET_BOOKS,
    SEARCH_BOOKS_ERROR,
    SEARCH_BOOKS_LOADING,
    SEARCH_BOOKS_SUCCESS,
    SELECT_BOOK
} from "./booksActions.ts";

const initialBookState: BookState = {
    query: "",
    mode: "all",
    status: "idle",
    items: [],
    selectedBookKey: null,
    error: null,
}

export function booksReducer(
    state: BookState = initialBookState,
    action: BooksAction
): BookState {
    switch (action.type) {
        case CHANGE_QUERY:
            return {
                ...state,
                query: action.payload,
            };
        case CHANGE_SEARCH_MODE:
            return {
                ...state,
                mode: action.payload,
            }
        case SEARCH_BOOKS_LOADING:
            return {
                ...state,
                status: "loading",
                items: [],
                selectedBookKey: null,
                error: null,
            }
        case SEARCH_BOOKS_SUCCESS:
            return {
                ...state,
                status: "success",
                items: action.payload,
                selectedBookKey: action.payload[0]?.key ?? null,
                error: null,
            }
        case SEARCH_BOOKS_ERROR:
            return {
                ...state,
                status: "error",
                items: [],
                selectedBookKey: null,
                error: action.payload,
            }
        case SELECT_BOOK:
            return {
                ...state,
                selectedBookKey: action.payload,
            }

        case RESET_BOOKS:
            return initialBookState;

        default:
            return state;
    }
}