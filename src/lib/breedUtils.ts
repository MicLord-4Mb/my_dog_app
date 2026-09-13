import type { DogBreed } from '@/features/breeds/breedSlice';

/**
 * Pure predicate checking whether a breed belongs to a specific group category.
 * Case-insensitive comparison with fallback to `true` for 'all' or empty filter.
 *
 * @param breed - DogBreed domain entity.
 * @param group - Target breed group name or null/undefined for any group.
 * @returns `true` if the breed matches the group filter.
 */
export const isBreedInGroup = (breed: DogBreed, group?: string | null): boolean => {
  if (!group || group.toLowerCase() === 'all') return true;
  return breed.breedGroup?.toLowerCase() === group.toLowerCase();
};
