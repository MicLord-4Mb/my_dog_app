import {searchBooks} from "@/api/bookApi";
import type {BookSearchParams} from "@/types/books.types";
import {searchBooksErrorAction, searchBooksLoadingAction, searchBooksSuccessAction} from "./booksActions.ts";


export function loadBooks(params: BookSearchParams): AppThunk<Promise<void>> {
    return async function (dispatch, getState): Promise<void> {
        const trQuery = params.query.trim();

        if (!trQuery) {
            dispatch(searchBooksErrorAction("please enter a valid query."));
            return;
        }
        const currState = getState().books;
        if (currState.status === "loading") {
            return;
        }
        dispatch(searchBooksLoadingAction());
        try {
            const books = await searchBooks(params);
            dispatch(searchBooksSuccessAction(books));
        } catch (error) {
            dispatch(searchBooksErrorAction(error instanceof Error ? error.message : "something went wrong"));
        }
    }
}