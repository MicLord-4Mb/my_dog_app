import { createBrowserRouter } from 'react-router';
import { rootRoute } from '@/routes/root.route';

/**
 * Main application router instance created via `createBrowserRouter`.
 * Assembled cleanly from modular feature route objects.
 */
export const AppRouter = createBrowserRouter([rootRoute]);
