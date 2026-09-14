import type { RouteObject } from 'react-router';

export const homeRoute: RouteObject = {
  index: true,
  lazy: async () => {
    const { HomePage } = await import('@/pages/HomePage');
    return { Component: HomePage };
  },
};
