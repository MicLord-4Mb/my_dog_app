import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useBreedHeroContext } from './BreedHeroContext';

const heroImageVariants = cva(
  'relative z-10 w-full h-full cursor-zoom-in transition-all duration-500 ease-out',
  {
    variants: {
      fitMode: {
        cover: 'object-cover object-[center_20%] group-hover:scale-105',
        contain: 'object-contain object-center p-3 sm:p-4 hover:scale-[1.02]',
      },
    },
    defaultVariants: {
      fitMode: 'cover',
    },
  }
);

const STYLES = {
  placeholderContainer: "w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-surface-container-low to-surface-container-highest text-on-surface-variant",
  placeholderIconWrap: "w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-3 text-primary",
  placeholderIcon: "material-symbols-outlined text-[44px]",
  placeholderTitle: "font-headline font-semibold text-base text-on-surface",
  placeholderSub: "text-xs text-on-surface-variant mt-1",
  ambientBlur: "absolute inset-0 w-full h-full object-cover blur-2xl scale-125 opacity-40 pointer-events-none select-none",
  overlayGradient: "absolute inset-0 z-10 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80 pointer-events-none",
};

interface BreedHeroMediaProps extends VariantProps<typeof heroImageVariants> {
  className?: string;
}

export const BreedHeroMedia = ({ className }: BreedHeroMediaProps) => {
  const { breed, fitMode, showPlaceholder, onImageError, onLightboxOpen } = useBreedHeroContext();

  return (
    <>
      {showPlaceholder ? (
        <div className={cn(STYLES.placeholderContainer, className)}>
          <div className={STYLES.placeholderIconWrap}>
            <span className={STYLES.placeholderIcon}>pets</span>
          </div>
          <p className={STYLES.placeholderTitle}>{breed.name}</p>
          <span className={STYLES.placeholderSub}>No official image available from API</span>
        </div>
      ) : (
        <>
          <div
            style={{ backgroundImage: `url(${breed.imageUrl})` }}
            className={STYLES.ambientBlur}
          />
          <img
            src={breed.imageUrl || ''}
            alt={breed.name}
            onError={onImageError}
            onClick={onLightboxOpen}
            className={cn(heroImageVariants({ fitMode }), className)}
            loading="lazy"
          />
        </>
      )}
      <div className={STYLES.overlayGradient} />
    </>
  );
};
