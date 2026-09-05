import React from 'react';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { Footer } from '@/components/layout/Footer';

/**
 * Props for the application base `Layout` component.
 */
interface LayoutProps {
  /** Page content elements */
  children: React.ReactNode;
}

const STYLES = {
  container: "min-h-screen flex flex-col bg-surface text-on-surface",
  main: "flex-1 pt-16 md:pt-20",
};

/**
 * Main application shell layout: wraps pages with Header, main content area,
 * desktop Footer, and mobile BottomNav.
 */
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={STYLES.container}>
      <Header />
      <main className={STYLES.main}>{children}</main>
      <Footer />
      <BottomNav />
    </div>
  );
};
