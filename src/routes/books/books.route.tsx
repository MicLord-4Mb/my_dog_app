import { ROUTES } from "@/constants/routes";
import { Navigate, type RouteObject } from 'react-router';

/**
 * Route definition for the books feature section:
 * - Directs root `/books` path to `/books/search` via redirect.
 * - Lazily loads `BooksPage` component for optimal initial bundle performance.
 */
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
        const { BooksPage } = await import('@/components/books/BooksPage');
        return { Component: BooksPage };
      },
    },
  ],
};

