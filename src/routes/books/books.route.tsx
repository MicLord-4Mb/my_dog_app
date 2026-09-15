import {ROUTES} from "@/constants/routes";
import {Navigate, type RouteObject} from 'react-router';

export const booksRoute: RouteObject = {
  path: 'books',
  children: [
    {
      index: true,
      element: <Navigate to={ROUTES.SEARCH} replace />,
    },
    {
      path: ROUTES.SEARCH,
      lazy: async () => {
        const {BooksPage} = await import('@/components/books/BooksPage');
        return {Component: BooksPage};
      },
    },
  ],
};
