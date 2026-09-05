import {store} from "@/store";
import { REQUEST_STATUS } from '@/types/request';
import {fetchBreeds} from "@/features/breeds/breedThunks";

export const galleryLoader = async () => {
  const state = store.getState();

  if (state.breeds.request.status === REQUEST_STATUS.IDLE) {
    await store.dispatch(fetchBreeds());
  }

  const newState = store.getState();
  if (newState.breeds.request.status === REQUEST_STATUS.ERROR) {
    throw new Response(
      newState.breeds.request.error.message || "Failed to load breeds.",
      { status: newState.breeds.request.error.code || 500}
    );
  }

  return null;
};
