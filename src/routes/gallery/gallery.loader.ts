import { redirect } from 'react-router';
import type { LoaderFunction } from 'react-router';
import { store } from '@/store';
import { REQUEST_STATUS } from '@/types/request';
import { fetchBreeds } from '@/features/breeds/breedThunks';
import { LINKS } from '@/constants/routes';
import { selectBreedsByGroup } from '@/features/breeds/breedSelectors';

let activeFetchPromise: Promise<any> | null = null;

/**
 * Route loader for the Gallery route hierarchy (`id: "gallery"`).
 * Ensures breeds are loaded into the Redux store.
 * Dispatches fetchBreeds() thunk if the store is idle and caches the promise to avoid race conditions.
 * Throws a Response on error to trigger the route error boundary.
 */
export const galleryLoader = async () => {
  const state = store.getState();

  if (state.breeds.request.status === REQUEST_STATUS.IDLE) {
    if (!activeFetchPromise) {
      activeFetchPromise = store.dispatch(fetchBreeds());
    }
  }

  if (activeFetchPromise) {
    try {
      await activeFetchPromise;
    } catch {
      // Ignore thunk dispatch errors here, the state will reflect REQUEST_STATUS.ERROR
    } finally {
      activeFetchPromise = null;
    }
  }

  const newState = store.getState();

  if (newState.breeds.request.status === REQUEST_STATUS.ERROR) {
    throw new Response(
      newState.breeds.request.error.message || 'Failed to load breeds.',
      { status: newState.breeds.request.error.code || 500 }
    );
  }

  return null;
};

/**
 * Index route loader: resolves the first breed in the active group
 * and redirects to its detail page.
 */
export const galleryIndexLoader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const group = url.searchParams.get('group') || 'all';
  await galleryLoader();
  const groupBreeds = selectBreedsByGroup(store.getState(), group);
  const firstBreed = groupBreeds[0];

  if (!firstBreed) {
    return redirect(LINKS.grid(group));
  }
  return redirect(LINKS.breed(firstBreed.id, group));
};

/**
 * Ensures `?group=` is present on the breed detail URL; defaults to `all`.
 */
export const breedDetailLoader: LoaderFunction = ({ request, params }) => {
  const url = new URL(request.url);
  if (!url.searchParams.get('group')) {
    return redirect(LINKS.breed(params.id || '', 'all'));
  }
  return null;
};

/**
 * Ensures `?group=` is present on the grid URL; defaults to `all`.
 */
export const breedGridLoader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url);
  if (!url.searchParams.get('group')) {
    return redirect(LINKS.grid('all'));
  }
  return null;
};
