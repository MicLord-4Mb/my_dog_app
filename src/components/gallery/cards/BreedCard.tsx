import { BreedCardContent } from "@/components/gallery/cards/BreedCardContent";
import { BreedLightbox } from "@/components/gallery/cards/BreedLightbox";
import { toggleFavorite } from "@/features/favorites/favoritesSlice";
import { selectFavoritesSet } from "@/features/favorites/favoritesSelectors";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useState } from 'react';
import type { DogBreed } from "@/types/breed.types";
import { Card } from '@/components/ui/card';
import { BreedHeroImage } from '@/components/gallery/cards/BreedHeroImage';

const STYLES = {
  cardContainer: "w-full md:rounded-3xl border-secondary-fixed/50 shadow-md overflow-hidden hover:shadow-xl transition-all duration-300",
};

interface BreedCardProps {
  breed: DogBreed;
  onPrev?: () => void;
  onNext?: () => void;
  prevBreedName?: string;
  nextBreedName?: string;
  positionText?: string;
}

export const BreedCard = ({
  breed,
  onPrev,
  onNext,
  prevBreedName,
  nextBreedName,
  positionText,
}:BreedCardProps) => {
  const [imgError, setImgError] = useState(false);
  const [fitMode, setFitMode] = useState<'cover' | 'contain'>('cover');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const dispatch = useAppDispatch();
  const favoritesSet = useAppSelector(selectFavoritesSet);
  const isInFavorites = favoritesSet.has(breed.id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(breed.id))
  }

  const imageUrl = breed.imageUrl;
  const showPlaceholder = !imageUrl || imgError;

  return (
    <>
      <Card className={STYLES.cardContainer}>
        <BreedHeroImage
          breedName={breed.name}
          breedGroup={breed.breedGroup || 'Purebred'}
          imageUrl={imageUrl || ''}
          showPlaceholder={showPlaceholder}
          onImageError={() => setImgError(true)}
          onLightboxOpen={() => setIsLightboxOpen(true)}
          fitMode={fitMode}
          onToggleFitMode={() => setFitMode((prev) => (prev === 'cover' ? 'contain' : 'cover'))}
          isInFavorites={isInFavorites}
          onToggleFavorite={handleToggleFavorite}
          onPrev={onPrev}
          onNext={onNext}
          prevBreedName={prevBreedName}
          nextBreedName={nextBreedName}
          positionText={positionText}
        />

        <BreedCardContent breed={breed} />
      </Card>

      <BreedLightbox
        breed={breed}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        />
    </>
  );
};
