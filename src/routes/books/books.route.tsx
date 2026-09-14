import type { RouteObject } from 'react-router';

export const booksRoute: RouteObject = {
  path: 'books',
  lazy: async () => {
    const { BooksPage } = await import('@/components/books/BooksPage');
    return { Component: BooksPage };
  },
};
