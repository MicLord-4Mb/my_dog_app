import React, { useState } from 'react';
import { Link } from 'react-router';
import { cva } from 'class-variance-authority';
import type { DogBreed } from '@/features/breeds/breedSlice';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const actionButtonVariants = cva(
  'w-9 h-9 sm:w-10 sm:h-10 rounded-full backdrop-blur-md shadow-sm transition-all',
  {
    variants: {
      variant: {
        ghost: 'bg-surface/80 hover:bg-surface text-on-surface hover:text-primary',
        active: 'bg-primary text-on-primary scale-105 hover:bg-primary/90',
      },
    },
    defaultVariants: {
      variant: 'ghost',
    },
  }
);

const STYLES = {
  linkWrapper: "block group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl h-full",
  cardContainer: "h-full rounded-2xl border border-secondary-fixed/50 bg-surface shadow-[0_4px_15px_rgba(15,23,42,0.04)] group-hover:shadow-[0_8px_25px_rgba(15,23,42,0.08)] group-hover:border-primary/30 transition-all duration-300 overflow-hidden flex flex-col",
  photoArea: "h-48 relative overflow-hidden bg-primary/5",
  placeholderWrap: "w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-surface-container-low to-surface-container-highest text-on-surface-variant",
  placeholderIconBox: "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-1.5 text-primary",
  placeholderIcon: "material-symbols-outlined text-[24px]",
  placeholderText: "text-xs text-on-surface-variant font-medium",
  ambientBlur: "absolute inset-0 w-full h-full bg-cover bg-center blur-xl scale-125 opacity-30 pointer-events-none select-none",
  mainPhoto: "relative z-10 w-full h-full object-cover object-[center_20%] transition-transform duration-500 ease-out group-hover:scale-105",
  overlayGradient: "absolute inset-0 z-10 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-80 pointer-events-none",
  groupBadge: "absolute bottom-2.5 left-2.5 z-20 bg-surface/90 backdrop-blur-md border-0 px-2.5 py-0.5 rounded-full shadow-xs text-[11px] font-semibold text-on-surface flex items-center gap-1",
  groupBadgeIcon: "material-symbols-outlined text-primary text-[13px]",
  contentBody: "p-5 flex flex-col flex-1 gap-3",
  title: "font-headline text-lg sm:text-xl font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1",
  subTitle: "text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider mt-0.5",
  temperamentWrap: "flex flex-wrap gap-1.5 mt-auto pt-1",
  temperamentBadge: "px-2 py-0.5 rounded bg-primary/10 text-primary border-primary/20 text-xs font-medium",
  footer: "p-5 pt-3 border-t border-secondary-fixed/30 flex items-center justify-between mt-auto",
  footerText: "text-xs font-medium text-on-surface-variant",
  detailsBtn: "text-primary font-semibold text-xs p-0 h-auto gap-1 group-hover:translate-x-1 duration-200",
  detailsBtnIcon: "material-symbols-outlined text-[16px]",
  favoriteBtn: "absolute top-2.5 right-2.5 z-20",
  favoriteIcon: "material-symbols-outlined text-[20px] sm:text-[22px]",
};

interface BreedCompactCardProps {
  breed: DogBreed;
  to: string;
  isInFavorites?: boolean;
  onToggleFavorite?: () => void;
}

export const BreedCompactCard: React.FC<BreedCompactCardProps> = ({
  breed,
  to,
  isInFavorites = false,
  onToggleFavorite,
}) => {
  const [imgError, setImgError] = useState(false);
  const imageUrl = breed.imageUrl;
  const showPlaceholder = !imageUrl || imgError;
  const temperamentList = breed.temperament;

  const avgWeight = breed.weightMetric
    ? `${breed.weightMetric} kg`
    : (breed.weightImperial ? `${breed.weightImperial} lbs` : 'N/A');

  return (
    <Link to={to} className={STYLES.linkWrapper}>
      <Card className={STYLES.cardContainer}>
        <div className={STYLES.photoArea}>
          {showPlaceholder ? (
            <div className={STYLES.placeholderWrap}>
              <div className={STYLES.placeholderIconBox}>
                <span className={STYLES.placeholderIcon}>pets</span>
              </div>
              <span className={STYLES.placeholderText}>No image available</span>
            </div>
          ) : (
            <>
              <div
                style={{ backgroundImage: `url(${imageUrl})` }}
                className={STYLES.ambientBlur}
              />
              <img
                src={imageUrl}
                alt={breed.name}
                onError={() => setImgError(true)}
                className={STYLES.mainPhoto}
                loading="lazy"
              />
              <div className={STYLES.overlayGradient} />
            </>
          )}

          <Badge variant="outline" className={STYLES.groupBadge}>
            <span className={STYLES.groupBadgeIcon}>verified</span>
            <span>{breed.breedGroup || 'Purebred'}</span>
          </Badge>

          {onToggleFavorite && (
            <Button
              variant="ghost"
              size="icon"
              aria-label={isInFavorites ? "Remove from favorites" : "Save to favorites"}
              title={isInFavorites ? "Remove from favorites" : "Save to favorites"}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleFavorite();
              }}
              className={cn(
                STYLES.favoriteBtn,
                actionButtonVariants({ variant: isInFavorites ? 'active' : 'ghost' })
              )}
            >
              <span
                className={STYLES.favoriteIcon}
                style={{ fontVariationSettings: isInFavorites ? "'FILL' 1" : "'FILL' 0" }}
              >
                favorite
              </span>
            </Button>
          )}
        </div>

        <CardContent className={STYLES.contentBody}>
          <div>
            <h3 className={STYLES.title}>{breed.name}</h3>
            <p className={STYLES.subTitle}>
              {breed.breedGroup ? `${breed.breedGroup} Group` : 'General Breed Group'}
            </p>
          </div>

          {temperamentList.length > 0 && (
            <div className={STYLES.temperamentWrap}>
              {temperamentList.slice(0, 3).map((trait) => (
                <Badge key={trait} variant="outline" className={STYLES.temperamentBadge}>
                  {trait}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>

        <CardFooter className={STYLES.footer}>
          <span className={STYLES.footerText}>Avg: {avgWeight}</span>
          <Button variant="link" className={STYLES.detailsBtn}>
            <span>Details</span>
            <span className={STYLES.detailsBtnIcon}>arrow_forward</span>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};
