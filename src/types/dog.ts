import type { RequestState } from '@/types/request';

/**
 * Domain model for a dog breed with full characteristics and physical metrics.
 */
export interface DogBreed {
  /** Unique breed identifier */
  id: string;
  /** Breed name */
  name: string;
  /** Purpose the breed was bred for */
  bredFor?: string;
  /** Breed group/category (e.g. Hound, Toy, Working) */
  breedGroup?: string;
  /** Average life expectancy */
  lifeSpan?: string;
  /** Temperament traits array */
  temperament: string[];
  /** Country/region of origin */
  origin?: string;
  /** Description text */
  description?: string;
  /** Historical background */
  history?: string;
  /** Height in centimeters */
  heightMetric?: string;
  /** Height in inches */
  heightImperial?: string;
  /** Weight in kilograms */
  weightMetric?: string;
  /** Weight in pounds */
  weightImperial?: string;
  /** Public photo URL */
  imageUrl: string | null;
}

/**
 * Generic normalized data structure (O(1) dictionary lookup and ordered IDs array).
 */
export interface NormalizedData<T> {
  entities: Record<string, T>;
  ids: string[];
}

/**
 * Redux state structure for the breeds feature slice.
 */
export interface BreedsState {
  /** Async request lifecycle state containing normalized entities */
  request: RequestState<NormalizedData<DogBreed>>;
  /** Active selected breed ID */
  selectedBreedId: string | null;
}
