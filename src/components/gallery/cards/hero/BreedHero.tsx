import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';
import type { DogBreed } from '@/types/breed.types';
import { BreedHeroContext } from './BreedHeroContext';
import { BreedHeroMedia } from './BreedHeroMedia';
import { BreedHeroNavigation } from './BreedHeroNavigation';
import { BreedHeroBadges } from './BreedHeroBadges';
import { BreedHeroToolbar } from './BreedHeroToolbar';

const STYLES = {
  container: "relative w-full h-64 sm:h-80 md:h-[420px] bg-surface-container-high overflow-hidden group",
};

export interface BreedHeroProps {
  breed: DogBreed;
  onLightboxOpen?: () => void;
  className?: string;
  children: React.ReactNode;
}

export const BreedHeroComponent = ({
  breed,
  onLightboxOpen,
  className,
  children,
}: BreedHeroProps) => {
  const [imgError, setImgError] = useState(false);
  const [fitMode, setFitMode] = useState<'cover' | 'contain'>('cover');

  // Reset error state when breed changes
  useEffect(() => {
    setImgError(false);
  }, [breed.id, breed.imageUrl]);

  const showPlaceholder = !breed.imageUrl || imgError;

  const toggleFitMode = useCallback(() => {
    setFitMode((prev) => (prev === 'cover' ? 'contain' : 'cover'));
  }, []);

  const handleImageError = useCallback(() => {
    setImgError(true);
  }, []);

  const value = useMemo(
    () => ({
      breed,
      fitMode,
      toggleFitMode,
      showPlaceholder,
      onImageError: handleImageError,
      onLightboxOpen,
    }),
    [breed, fitMode, toggleFitMode, showPlaceholder, handleImageError, onLightboxOpen]
  );

  return (
    <BreedHeroContext.Provider value={value}>
      <div className={cn(STYLES.container, className)}>
        {children}
      </div>
    </BreedHeroContext.Provider>
  );
};

export const BreedHero = Object.assign(BreedHeroComponent, {
  Media: BreedHeroMedia,
  Navigation: BreedHeroNavigation,
  Badges: BreedHeroBadges,
  Toolbar: BreedHeroToolbar,
});
