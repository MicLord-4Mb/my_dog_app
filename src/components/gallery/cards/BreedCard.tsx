import { BreedCardContent } from "@/components/gallery/cards/BreedCardContent";
import { BreedLightbox } from "@/components/gallery/cards/BreedLightbox";
import { toggleFavorite } from "@/features/favorites/favoritesSlice";
import { selectFavoritesSet } from "@/features/favorites/favoritesSelectors";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useState } from 'react';
import type { DogBreed } from "@/types/breed.types";
import { Card } from '@/components/ui/card';
import { BreedHero } from '@/components/gallery/cards/hero';

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
}: BreedCardProps) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const dispatch = useAppDispatch();
  const favoritesSet = useAppSelector(selectFavoritesSet);
  const isInFavorites = favoritesSet.has(breed.id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(breed.id))
  }

  return (
    <>
      <Card className={STYLES.cardContainer}>
        <BreedHero breed={breed} onLightboxOpen={() => setIsLightboxOpen(true)}>
          <BreedHero.Media />
          <BreedHero.Navigation
            onPrev={onPrev}
            onNext={onNext}
            prevBreedName={prevBreedName}
            nextBreedName={nextBreedName}
          />
          <BreedHero.Badges positionText={positionText} />
          <BreedHero.Toolbar
            isInFavorites={isInFavorites}
            onToggleFavorite={handleToggleFavorite}
          />
        </BreedHero>

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
