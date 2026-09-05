import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './store';
import { ROUTES } from './constants/routes';
import { Layout } from './components/layout/Layout';
import { Loader2 } from 'lucide-react';

// Lazy loading route pages for code splitting and faster initial load
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const GalleryPage = lazy(() => import('./pages/GalleryPage').then(m => ({ default: m.GalleryPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

/**
 * Suspense fallback loading indicator while page chunk is being fetched.
 */
const PageLoader = () => (
  <div className="w-full h-[60vh] flex flex-col items-center justify-center">
    <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
    <p className="text-on-surface-variant font-medium">Loading page...</p>
  </div>
);

/**
 * Application root component: encapsulates Redux Provider, BrowserRouter, and application routes.
 */
export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path={ROUTES.HOME} element={<HomePage />} />
              <Route path={ROUTES.GALLERY} element={<GalleryPage />} />
              <Route path={ROUTES.GALLERY_BREED} element={<GalleryPage />} />
              <Route path={ROUTES.GALLERY_GRID} element={<GalleryPage />} />
              <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
