import React from 'react';

const STYLES = {
  section: "w-full py-16 md:py-20 bg-surface relative",
  inner: "max-w-container-max mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center",
  contentWrap: "flex flex-col gap-6",
  title: "font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-on-surface leading-tight",
  body: "text-base text-on-surface-variant leading-relaxed",
  statsWrap: "flex items-center gap-8 pt-2",
  statCol: "flex flex-col gap-1",
  statVal1: "font-headline text-3xl font-extrabold text-primary",
  statVal2: "font-headline text-3xl font-extrabold text-tertiary",
  statDivider: "w-px h-12 bg-secondary-fixed",
  imageWrap: "relative h-72 sm:h-88 w-full rounded-2xl overflow-hidden shadow-lg border border-secondary-fixed/50",
  image: "w-full h-full object-cover",
};

/**
 * Editorial expert section with curated collection messaging,
 * user rating / community stats, and a lazy-loaded feature image.
 */
export const EditorialSection: React.FC = () => (
  <section className={STYLES.section}>
    <div className={STYLES.inner}>
      <div className={STYLES.contentWrap}>
        <h2 className={STYLES.title}>
          Curated by Experts. Loved by Pet Enthusiasts.
        </h2>
        <p className={STYLES.body}>
          Our collection isn't just about cute pictures; it's a meticulously organized database designed to help you understand the nuances, history, and characteristics of every breed.
        </p>
        <div className={STYLES.statsWrap}>
          <div className={STYLES.statCol}>
            <span className={STYLES.statVal1}>
              4.9/5
            </span>
            <span className="label-caption">
              User Rating
            </span>
          </div>
          <div className={STYLES.statDivider} />
          <div className={STYLES.statCol}>
            <span className={STYLES.statVal2}>
              50k+
            </span>
            <span className="label-caption">
              Active Lovers
            </span>
          </div>
        </div>
      </div>

      <div className={STYLES.imageWrap}>
        <img
          src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80"
          alt="Dogs collage"
          className={STYLES.image}
          loading="lazy"
        />
      </div>
    </div>
  </section>
);
