import {fetchBreedsApi} from "@/api/dogApi";
import type {DogBreed} from "@/types/dog";

// In-memory cache
let cachedBreeds: DogBreed[] | null = null;

/**
 * Alternative way to store breeds in app.
 * Axios + in-memory cache
 */
export const loadBreedsAsync = async (): Promise<DogBreed[]> => {
  if (cachedBreeds && cachedBreeds.length > 0) {
    return cachedBreeds;
  }

  const breeds = await fetchBreedsApi();
  cachedBreeds = breeds;
  return breeds;
}
