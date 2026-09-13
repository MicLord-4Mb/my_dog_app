import {toggleFavorite} from "@/features/favorites/favoritesSlice";
import {selectIsBreedInFavorites} from "@/features/favorites/favoritesSelectors";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import React, { useState, useEffect, useRef } from 'react';
import type { DogBreed } from '@/features/breeds/breedSlice';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BreedHeroImage } from '@/components/gallery/cards/BreedHeroImage';
import { BreedStatsGrid } from '@/components/gallery/cards/BreedStatsGrid';
import { InfoCard } from '@/components/gallery/cards/InfoCard';
import { CircularProgressIcon } from '@/components/icons/CircularProgressIcon';

const STYLES = {
  cardContainer: "w-full md:rounded-3xl border-secondary-fixed/50 shadow-md overflow-hidden hover:shadow-xl transition-all duration-300",
  content: "p-5 sm:p-7 md:p-8 flex flex-col gap-6 -mt-6 md:-mt-8 relative z-10",
  headerRow: "flex flex-col md:flex-row md:items-end justify-between gap-3",
  badgeGroup: "inline-flex items-center gap-2 mb-1",
  groupBadge: "rounded-sm text-[11px] uppercase tracking-wider",
  originText: "text-xs text-on-surface-variant font-medium",
  title: "font-headline text-2xl sm:text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight",
  temperamentWrapper: "flex flex-wrap gap-1.5",
  temperamentBadge: "text-xs font-medium",
  description: "text-sm md:text-base text-on-surface-variant leading-relaxed",
  widgetsGrid: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-1",
  circularProgressWrapper: "w-20 h-20",
  circularProgressSvg: "w-full h-full transform -rotate-90",
  circularProgressBg: "text-surface-container-high",
  circularProgressFg: "text-primary",
  circularProgressText: "absolute inset-0 flex items-center justify-center font-headline text-base font-bold text-on-surface",
  lightboxDialog: "fixed inset-0 m-auto p-4 sm:p-6 bg-transparent max-w-5xl max-h-[90vh] backdrop:bg-black/85 backdrop:backdrop-blur-md border-0 outline-none select-none overflow-hidden",
  lightboxWrapper: "relative flex flex-col items-center justify-center max-w-full max-h-full",
  lightboxCloseBtn: "fixed top-4 right-4 sm:top-6 sm:right-6 z-50 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
  lightboxImage: "max-h-[75vh] sm:max-h-[78vh] w-auto max-w-full rounded-2xl shadow-2xl object-contain",
  lightboxTitleArea: "mt-3 text-center text-white",
  lightboxTitle: "font-headline font-bold text-lg sm:text-xl",
  lightboxGroupText: "text-xs sm:text-sm text-white/70",
};

interface BreedCardProps {
  breed: DogBreed;
  onPrev?: () => void;
  onNext?: () => void;
  prevBreedName?: string;
  nextBreedName?: string;
  positionText?: string;
}

export const BreedCard: React.FC<BreedCardProps> = ({
  breed,
  onPrev,
  onNext,
  prevBreedName,
  nextBreedName,
  positionText,
}) => {
  const [imgError, setImgError] = useState(false);
  const [fitMode, setFitMode] = useState<'cover' | 'contain'>('cover');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const dispatch = useAppDispatch();
  const isInFavorites = useAppSelector(selectIsBreedInFavorites(breed.id));

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(breed.id))
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isLightboxOpen) {
      dialog?.showModal();
    } else {
      dialog?.close();
    }
  }, [isLightboxOpen]);

  const imageUrl = breed.imageUrl;
  const showPlaceholder = !imageUrl || imgError;
  const temperamentList = breed.temperament;

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

        <CardContent className={STYLES.content}>
          <div className={STYLES.headerRow}>
            <div>
              <div className={STYLES.badgeGroup}>
                <Badge variant="secondary" className={STYLES.groupBadge}>
                  {breed.breedGroup || 'General Dog Breed'}
                </Badge>
                {breed.origin && (
                  <span className={STYLES.originText}>• {breed.origin}</span>
                )}
              </div>
              <h1 className={STYLES.title}>{breed.name}</h1>
            </div>

            {temperamentList.length > 0 && (
              <div className={STYLES.temperamentWrapper}>
                {temperamentList.map((trait) => (
                  <Badge key={trait} variant="default" className={STYLES.temperamentBadge}>
                    {trait}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <p className={STYLES.description}>
            {breed.description ||
              (breed.bredFor
                ? `Originally bred for ${breed.bredFor.toLowerCase()}. Known for being ${breed.temperament.join(', ').toLowerCase() || 'a wonderful companion'}.`
                : `${breed.name} is a distinctive dog breed celebrated for its unique character, intelligence, and companionship.`)}
          </p>

          <BreedStatsGrid breed={breed} />

          <div className={STYLES.widgetsGrid}>
            <InfoCard
              title="Trainability & Activity"
              description="Requires regular mental exercise and daily walks to stay healthy and happy."
            >
              <div className={STYLES.circularProgressWrapper}>
                <CircularProgressIcon
                  className={STYLES.circularProgressSvg}
                  bgClassName={STYLES.circularProgressBg}
                  fgClassName={STYLES.circularProgressFg}
                />
                <div className={STYLES.circularProgressText}>85%</div>
              </div>
            </InfoCard>

            <InfoCard
              title="Did you know?"
              icon="lightbulb"
              description={breed.history || `The ${breed.name} possesses exceptional sensory skills and adapts wonderfully to home environments with proper socialization and care.`}
              hasBlurBackground
              className="bg-surface-tint/5 border-primary/20"
            />
          </div>
        </CardContent>
      </Card>

      {imageUrl && (
        <dialog
          ref={dialogRef}
          onClose={() => setIsLightboxOpen(false)}
          onClick={(e) => {
            if (e.target === dialogRef.current) setIsLightboxOpen(false);
          }}
          className={STYLES.lightboxDialog}
        >
          <div className={STYLES.lightboxWrapper}>
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className={STYLES.lightboxCloseBtn}
              aria-label="Close"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
            <img src={imageUrl} alt={breed.name} className={STYLES.lightboxImage} />
            <div className={STYLES.lightboxTitleArea}>
              <h3 className={STYLES.lightboxTitle}>{breed.name}</h3>
              {breed.breedGroup && <p className={STYLES.lightboxGroupText}>{breed.breedGroup}</p>}
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};
