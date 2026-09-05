import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import {RouterProvider} from "react-router";
import {AppRouter} from "@/router";

/**
 * Application root component: encapsulates Redux Provider, BrowserRouter, and application routes.
 */
export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={AppRouter} />
    </Provider>
  );
};

export default App;
