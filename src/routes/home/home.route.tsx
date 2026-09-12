import type { RouteObject } from 'react-router';

export const homeRoute: RouteObject = {
  index: true,
  lazy: async () => {
    const { HomePage } = await import('@/components/home/HomePage');
    return { Component: HomePage };
  },
};
