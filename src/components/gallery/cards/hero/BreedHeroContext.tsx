import { createContext, useContext } from 'react';
import type { DogBreed } from '@/types/breed.types';

export interface BreedHeroContextValue {
  breed: DogBreed;
  fitMode: 'cover' | 'contain';
  toggleFitMode: () => void;
  showPlaceholder: boolean;
  onImageError: () => void;
  onLightboxOpen?: () => void;
}

export const BreedHeroContext = createContext<BreedHeroContextValue | null>(null);

export const useBreedHeroContext = () => {
  const context = useContext(BreedHeroContext);
  if (!context) {
    throw new Error('BreedHero components must be used within a <BreedHero> provider');
  }
  return context;
};
