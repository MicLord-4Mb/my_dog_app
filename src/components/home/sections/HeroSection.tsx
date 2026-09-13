import React from 'react';
import { Link } from 'react-router';
import { ROUTES } from '@/constants/routes';
import { Button } from '@/components/ui/button';
import { UnderlineIcon } from '@/components/icons/UnderlineIcon';

const STYLES = {
  section: "relative w-full min-h-[calc(100vh-4rem)] md:min-h-[580px] flex items-center justify-center py-12 md:py-20 px-4 md:px-8 overflow-hidden",
  ambientGlowWrap: "absolute inset-0 z-0 pointer-events-none opacity-40",
  ambientGlowPrimary: "absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary-container/20 blur-[80px]",
  ambientGlowTertiary: "absolute top-[30%] -right-[20%] w-[60%] h-[60%] rounded-full bg-tertiary-container/20 blur-[100px]",
  contentWrap: "relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center",
  imageWrap: "relative w-44 h-44 sm:w-56 sm:h-56 mb-8 group",
  imageBorder: "absolute inset-0 rounded-full border-2 border-dashed border-primary/30 animate-[spin_40s_linear_infinite]",
  imageInner: "absolute inset-2 rounded-full overflow-hidden shadow-xl border border-secondary-fixed/40 bg-surface-container-highest",
  imageImg: "w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105",
  imageBadge: "absolute -bottom-2 -right-2 w-12 h-12 sm:w-14 sm:h-14 bg-primary rounded-full shadow-lg flex items-center justify-center animate-bounce",
  imageBadgeIcon: "material-symbols-outlined text-on-primary text-[24px] sm:text-[28px]",
  typographyWrap: "flex flex-col gap-3 mb-8",
  typographySubhead: "text-xs sm:text-sm font-bold text-primary tracking-widest uppercase mb-1",
  typographyTitle: "font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface tracking-tight leading-tight",
  typographyTitleHighlight: "text-primary relative inline-block",
  typographyTitleSvg: "absolute w-full h-3 -bottom-1 left-0 text-primary-container opacity-70 z-[-1]",
  typographyBody: "text-base sm:text-lg text-on-surface-variant max-w-xl mx-auto mt-2 leading-relaxed",
  ctaWrap: "flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto",
  ctaBtn: "w-full sm:w-auto text-base font-semibold shadow-[0_4px_14px_0_rgba(133,83,0,0.35)] group",
  ctaBtnInner: "flex items-center justify-center gap-2",
  ctaBtnIcon: "material-symbols-outlined text-[20px] transition-transform duration-300 group-hover:translate-x-1",
  statsWrap: "mt-12 flex items-center justify-center gap-8 opacity-80",
  statItem: "flex flex-col items-center",
  statValue: "font-headline text-xl sm:text-2xl font-bold text-on-surface",
  statValuePrimary: "font-headline text-xl sm:text-2xl font-bold text-primary",
  statDivider: "w-px h-8 bg-outline-variant/60",
};

/**
 * Hero section with ambient glow effects, featured image, headline,
 * CTA button linking to gallery, and trust/stats markers.
 */
export const HeroSection: React.FC = () => (
  <section className={STYLES.section}>
    {/* Ambient background glows */}
    <div className={STYLES.ambientGlowWrap}>
      <div className={STYLES.ambientGlowPrimary} />
      <div className={STYLES.ambientGlowTertiary} />
    </div>

    <div className={STYLES.contentWrap}>
      {/* Hero Image Container with spinning dashed border animation */}
      <div className={STYLES.imageWrap}>
        <div className={STYLES.imageBorder} />
        <div className={STYLES.imageInner}>
          <img
            src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80"
            alt="Smiling Golden Retriever"
            className={STYLES.imageImg}
          />
        </div>
        <div className={STYLES.imageBadge}>
          <span className={STYLES.imageBadgeIcon}>
            favorite
          </span>
        </div>
      </div>

      {/* Typography */}
      <div className={STYLES.typographyWrap}>
        <span className={STYLES.typographySubhead}>
          Canine Curated Experience
        </span>
        <h1 className={STYLES.typographyTitle}>
          Welcome to{' '}
          <span className={STYLES.typographyTitleHighlight}>
            Dog Gallery
            <UnderlineIcon className={STYLES.typographyTitleSvg} />
          </span>
        </h1>
        <p className={STYLES.typographyBody}>
          Explore hundreds of dog breeds, discover their unique traits, personalities, and find your perfect canine companion.
        </p>
      </div>

      {/* CTA Action */}
      <div className={STYLES.ctaWrap}>
        <Button
          asChild
          size="lg"
          className={STYLES.ctaBtn}
        >
          <Link to={ROUTES.GALLERY} className={STYLES.ctaBtnInner}>
            <span>Go to Gallery</span>
            <span className={STYLES.ctaBtnIcon}>
              arrow_forward
            </span>
          </Link>
        </Button>
      </div>

      {/* Trust & Stats Markers */}
      <div className={STYLES.statsWrap}>
        <div className={STYLES.statItem}>
          <span className={STYLES.statValue}>300+</span>
          <span className="label-caption">
            Breeds
          </span>
        </div>
        <div className={STYLES.statDivider} />
        <div className={STYLES.statItem}>
          <span className={STYLES.statValue}>10k+</span>
          <span className="label-caption">
            Photos
          </span>
        </div>
        <div className={STYLES.statDivider} />
        <div className={STYLES.statItem}>
          <span className={STYLES.statValuePrimary}>Live</span>
          <span className="label-caption">
            TheDogAPI
          </span>
        </div>
      </div>
    </div>
  </section>
);
