import React from 'react';
import { HeroSection } from '@/components/home/sections/HeroSection';
import { FeaturesSection } from '@/components/home/sections/FeaturesSection';
import { EditorialSection } from '@/components/home/sections/EditorialSection';

const STYLES = {
  container: 'w-full flex flex-col overflow-hidden',
};

/**
 * Promotional landing page (HomePage):
 * - Hero section with live statistics and CTA to gallery.
 * - Feature cards section ("Why Dog Gallery?").
 * - Curated collection editorial block.
 *
 * @returns {React.JSX.Element} Landing page container with structured marketing sections.
 */
export const HomePage: React.FC = () => (
  <div className={STYLES.container}>
    <HeroSection />
    <FeaturesSection />
    <EditorialSection />
  </div>
);

