import { redirect } from 'react-router';
import type { LoaderFunction } from 'react-router';
import { store } from '@/store';
import type { DogBreed } from '@/types/dog';
import { REQUEST_STATUS } from '@/types/request';
import { fetchBreeds } from '@/features/breeds/breedThunks';
import { LINKS } from '@/constants/routes';

// --- Original imports (commented out, replaced by Redux-based approach) ---
// import {loadBreedsAsync} from "@/features/breeds/loadBreeds";

/**
 * Alternative galleryLoader (commented out, kept for reference)
 */
// export interface NewGalleryLoaderData {
//   breeds: Promise<DogBreed[]>;
// }
//
// export const newGalleryLoader = (): NewGalleryLoaderData => {
//   return {
//     breeds: loadBreedsAsync(),
//   }
// }

/**
 * Ensures breeds are loaded into the Redux store.
 * Returns the breeds array from the store, or throws a Response on error.
 */
const ensureBreedsLoaded = async (): Promise<DogBreed[]> => {
  const state = store.getState();

  if (state.breeds.request.status === REQUEST_STATUS.IDLE) {
    await store.dispatch(fetchBreeds());
  }

  const newState = store.getState();

  if (newState.breeds.request.status === REQUEST_STATUS.ERROR) {
    throw new Response(
      newState.breeds.request.error.message || 'Failed to load breeds.',
      { status: newState.breeds.request.error.code || 500 }
    );
  }

  const data = newState.breeds.request.data;
  if (!data) return [];

  return data.ids.map(id => data.entities[id]);
};

/**
 * Route loader for the Gallery route hierarchy (`id: "gallery"`).
 * Dispatches fetchBreeds() thunk if the store is idle.
 * Throws a Response on error to trigger the route error boundary.
 */
export const galleryLoader = async () => {
  await ensureBreedsLoaded();
  return null;
};

/**
 * Index route loader: resolves the first breed in the active group
 * and redirects to its detail page.
 */
export const galleryIndexLoader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const group = url.searchParams.get('group') || 'all';
  const breeds = await ensureBreedsLoaded();

  const firstBreed = (group.toLowerCase() !== 'all')
    ? (breeds.find((b) => b.breedGroup?.toLowerCase() === group.toLowerCase()) || breeds[0])
    : breeds[0];

  if (!firstBreed) return null;
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
