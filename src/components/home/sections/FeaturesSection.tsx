import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const STYLES = {
  section: "w-full py-16 md:py-24 bg-surface-container-low relative border-t border-secondary-fixed/30",
  inner: "max-w-container-max mx-auto px-4 md:px-8 relative z-10",
  header: "text-center mb-12",
  subhead: "text-xs font-bold text-primary tracking-widest uppercase mb-2 inline-block",
  title: "font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-on-surface",
  grid: "grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8",
  card: "p-6 sm:p-8 flex flex-col items-center text-center border-secondary-fixed/40 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 group",
  cardContent: "p-0 flex flex-col items-center text-center",
  iconWrap1: "w-16 h-16 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center mb-5 group-hover:scale-110 transition-transform",
  iconWrap2: "w-16 h-16 rounded-2xl bg-tertiary-container text-on-tertiary-container flex items-center justify-center mb-5 group-hover:scale-110 transition-transform",
  iconWrap3: "w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform",
  icon: "material-symbols-outlined text-[32px]",
  featureTitle: "font-headline text-xl font-bold text-on-surface mb-2",
  featureBody: "text-sm text-on-surface-variant leading-relaxed",
};

/**
 * Feature cards section ("Why Dog Gallery?"):
 * Three promotional cards highlighting key product features —
 * breed catalog size, instant filtering, and detailed metadata.
 */
export const FeaturesSection: React.FC = () => (
  <section className={STYLES.section}>
    <div className={STYLES.inner}>
      <div className={STYLES.header}>
        <span className={STYLES.subhead}>
          Discover
        </span>
        <h2 className={STYLES.title}>
          Why Dog Gallery?
        </h2>
      </div>

      <div className={STYLES.grid}>
        {/* Card 1 */}
        <Card className={STYLES.card}>
          <CardContent className={STYLES.cardContent}>
            <div className={STYLES.iconWrap1}>
              <span className={STYLES.icon}>pets</span>
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
        <Card className={STYLES.card}>
          <CardContent className={STYLES.cardContent}>
            <div className={STYLES.iconWrap2}>
              <span className={STYLES.icon}>photo_camera</span>
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
        <Card className={STYLES.card}>
          <CardContent className={STYLES.cardContent}>
            <div className={STYLES.iconWrap3}>
              <span className={STYLES.icon}>info</span>
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
);
