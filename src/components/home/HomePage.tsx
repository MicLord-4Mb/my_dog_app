import React from 'react';
import { HeroSection } from '@/components/home/sections/HeroSection';
import { FeaturesSection } from '@/components/home/sections/FeaturesSection';
import { EditorialSection } from '@/components/home/sections/EditorialSection';

/**
 * Promotional landing page (HomePage):
 * - Hero section with live statistics and CTA to gallery.
 * - Feature cards section ("Why Dog Gallery?").
 * - Curated collection editorial block.
 */
export const HomePage: React.FC = () => (
  <div className="w-full flex flex-col overflow-hidden">
    <HeroSection />
    <FeaturesSection />
    <EditorialSection />
  </div>
);
