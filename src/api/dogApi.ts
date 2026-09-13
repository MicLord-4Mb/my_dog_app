import axios from 'axios';
import { API_ENDPOINTS } from '@/constants/api';
import type { DogBreedDto } from '@/api/dto/dogBreed.dto';
import { mapDogBreedDtoToDomain } from '@/api/mappers/dogBreed.mapper';
import type { DogBreed } from '@/features/breeds/breedSlice';

/** TheDogAPI API key from environment variables */
const apiKey = import.meta.env.VITE_DOG_API_KEY || '';

/**
 * Configured Axios HTTP client instance for TheDogAPI.
 */
export const dogApiClient = axios.create({
  baseURL: 'https://api.thedogapi.com/v1',
  headers: {
    'Content-Type': 'application/json',
    ...(apiKey ? { 'x-api-key': apiKey } : {}),
  },
});

/**
 * Fetches all dog breeds from the API and maps DTOs to domain `DogBreed` models.
 * 
 * @returns Promise resolving to an array of domain `DogBreed` models.
 */
export const fetchBreedsApi = async (): Promise<DogBreed[]> => {
  const response = await dogApiClient.get<DogBreedDto[]>(API_ENDPOINTS.BREEDS);
  return response.data.map(mapDogBreedDtoToDomain);
};
