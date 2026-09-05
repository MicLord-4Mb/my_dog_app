import React from 'react';
import { Link } from 'react-router';
import { ROUTES } from '@/constants/routes';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UnderlineIcon } from '@/components/icons/UnderlineIcon';

const STYLES = {
  container: "w-full flex flex-col overflow-hidden",
  heroSection: "relative w-full min-h-[calc(100vh-4rem)] md:min-h-[580px] flex items-center justify-center py-12 md:py-20 px-4 md:px-8 overflow-hidden",
  ambientGlowWrap: "absolute inset-0 z-0 pointer-events-none opacity-40",
  ambientGlowPrimary: "absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary-container/20 blur-[80px]",
  ambientGlowTertiary: "absolute top-[30%] -right-[20%] w-[60%] h-[60%] rounded-full bg-tertiary-container/20 blur-[100px]",
  heroContentWrap: "relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center",
  heroImageWrap: "relative w-44 h-44 sm:w-56 sm:h-56 mb-8 group",
  heroImageBorder: "absolute inset-0 rounded-full border-2 border-dashed border-primary/30 animate-[spin_40s_linear_infinite]",
  heroImageInner: "absolute inset-2 rounded-full overflow-hidden shadow-xl border border-secondary-fixed/40 bg-surface-container-highest",
  heroImageImg: "w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105",
  heroImageBadge: "absolute -bottom-2 -right-2 w-12 h-12 sm:w-14 sm:h-14 bg-primary rounded-full shadow-lg flex items-center justify-center animate-bounce",
  heroImageBadgeIcon: "material-symbols-outlined text-on-primary text-[24px] sm:text-[28px]",
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
  featuresSection: "w-full py-16 md:py-24 bg-surface-container-low relative border-t border-secondary-fixed/30",
  featuresInner: "max-w-container-max mx-auto px-4 md:px-8 relative z-10",
  featuresHeader: "text-center mb-12",
  featuresSubhead: "text-xs font-bold text-primary tracking-widest uppercase mb-2 inline-block",
  featuresTitle: "font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-on-surface",
  featuresGrid: "grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8",
  featureCard: "p-6 sm:p-8 flex flex-col items-center text-center border-secondary-fixed/40 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 group",
  featureCardContent: "p-0 flex flex-col items-center text-center",
  featureIconWrap1: "w-16 h-16 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center mb-5 group-hover:scale-110 transition-transform",
  featureIconWrap2: "w-16 h-16 rounded-2xl bg-tertiary-container text-on-tertiary-container flex items-center justify-center mb-5 group-hover:scale-110 transition-transform",
  featureIconWrap3: "w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform",
  featureIcon: "material-symbols-outlined text-[32px]",
  featureTitle: "font-headline text-xl font-bold text-on-surface mb-2",
  featureBody: "text-sm text-on-surface-variant leading-relaxed",
  editorialSection: "w-full py-16 md:py-20 bg-surface relative",
  editorialInner: "max-w-container-max mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center",
  editorialContentWrap: "flex flex-col gap-6",
  editorialTitle: "font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-on-surface leading-tight",
  editorialBody: "text-base text-on-surface-variant leading-relaxed",
  editorialStatsWrap: "flex items-center gap-8 pt-2",
  editorialStatCol: "flex flex-col gap-1",
  editorialStatVal1: "font-headline text-3xl font-extrabold text-primary",
  editorialStatVal2: "font-headline text-3xl font-extrabold text-tertiary",
  editorialStatDivider: "w-px h-12 bg-secondary-fixed",
  editorialImageWrap: "relative h-72 sm:h-88 w-full rounded-2xl overflow-hidden shadow-lg border border-secondary-fixed/50",
  editorialImage: "w-full h-full object-cover",
};

/**
 * Promotional landing page (HomePage):
 * - Hero section with live statistics and CTA to gallery.
 * - Feature cards section ("Why Dog Gallery?").
 * - Curated collection editorial block.
 */
export const HomePage: React.FC = () => {
  return (
    <div className={STYLES.container}>
      {/* Hero Section */}
      <section className={STYLES.heroSection}>
        {/* Ambient background glows */}
        <div className={STYLES.ambientGlowWrap}>
          <div className={STYLES.ambientGlowPrimary} />
          <div className={STYLES.ambientGlowTertiary} />
        </div>

        <div className={STYLES.heroContentWrap}>
          {/* Hero Image Container with spinning dashed border animation */}
          <div className={STYLES.heroImageWrap}>
            <div className={STYLES.heroImageBorder} />
            <div className={STYLES.heroImageInner}>
              <img
                src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80"
                alt="Smiling Golden Retriever"
                className={STYLES.heroImageImg}
              />
            </div>
            <div className={STYLES.heroImageBadge}>
              <span className={STYLES.heroImageBadgeIcon}>
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

      {/* Feature Cards Section ("Why Dog Gallery?") */}
      <section className={STYLES.featuresSection}>
        <div className={STYLES.featuresInner}>
          <div className={STYLES.featuresHeader}>
            <span className={STYLES.featuresSubhead}>
              Discover
            </span>
            <h2 className={STYLES.featuresTitle}>
              Why Dog Gallery?
            </h2>
          </div>

          <div className={STYLES.featuresGrid}>
            {/* Card 1 */}
            <Card className={STYLES.featureCard}>
              <CardContent className={STYLES.featureCardContent}>
                <div className={STYLES.featureIconWrap1}>
                  <span className={STYLES.featureIcon}>pets</span>
                </div>
                <h3 className={STYLES.featureTitle}>
                  300+ Breeds
                </h3>
                <p className={STYLES.featureBody}>
                  From popular favorites to rare and unique working breeds, explore a vast catalog curated for all enthusiasts.
                </p>
              </CardContent>
            </Card>

            {/* Card 2 */}
            <Card className={STYLES.featureCard}>
              <CardContent className={STYLES.featureCardContent}>
                <div className={STYLES.featureIconWrap2}>
                  <span className={STYLES.featureIcon}>photo_camera</span>
                </div>
                <h3 className={STYLES.featureTitle}>
                  Instant Filtering
                </h3>
                <p className={STYLES.featureBody}>
                  Instant breed updates powered by Redux and cached state without unnecessary re-fetching.
                </p>
              </CardContent>
            </Card>

            {/* Card 3 */}
            <Card className={STYLES.featureCard}>
              <CardContent className={STYLES.featureCardContent}>
                <div className={STYLES.featureIconWrap3}>
                  <span className={STYLES.featureIcon}>info</span>
                </div>
                <h3 className={STYLES.featureTitle}>
                  Detailed Metadata
                </h3>
                <p className={STYLES.featureBody}>
                  Access comprehensive breed characteristics including temperament, size, weight, and lifespan.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Editorial Expert Section */}
      <section className={STYLES.editorialSection}>
        <div className={STYLES.editorialInner}>
          <div className={STYLES.editorialContentWrap}>
            <h2 className={STYLES.editorialTitle}>
              Curated by Experts. Loved by Pet Enthusiasts.
            </h2>
            <p className={STYLES.editorialBody}>
              Our collection isn't just about cute pictures; it's a meticulously organized database designed to help you understand the nuances, history, and characteristics of every breed.
            </p>
            <div className={STYLES.editorialStatsWrap}>
              <div className={STYLES.editorialStatCol}>
                <span className={STYLES.editorialStatVal1}>
                  4.9/5
                </span>
                <span className="label-caption">
                  User Rating
                </span>
              </div>
              <div className={STYLES.editorialStatDivider} />
              <div className={STYLES.editorialStatCol}>
                <span className={STYLES.editorialStatVal2}>
                  50k+
                </span>
                <span className="label-caption">
                  Active Lovers
                </span>
              </div>
            </div>
          </div>

          <div className={STYLES.editorialImageWrap}>
            <img
              src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80"
              alt="Dogs collage"
              className={STYLES.editorialImage}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
