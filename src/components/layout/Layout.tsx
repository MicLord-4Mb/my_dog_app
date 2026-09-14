import React from 'react';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { Footer } from '@/components/layout/Footer';
import {Outlet, useNavigation} from "react-router";

/**
 * Props for the application base `Layout` component.
 */
interface LayoutProps {
  /** Page content elements */
  children?: React.ReactNode;
}

const STYLES = {
  container: "min-h-screen flex flex-col bg-surface text-on-surface",
  main: "flex-1 pt-16 md:pt-20",
  progressBar: "fixed top-0 left-0 right-0 h-1 bg-primary z-50 animate-pulse transition-opacity duration-300 pointer-events-none",
};

/**
 * Main application shell layout: wraps pages with Header, main content area,
 * desktop Footer, and mobile BottomNav.
 */
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigation = useNavigation();
  const isNavigating = navigation.state !== 'idle';

  return (
    <div className={STYLES.container}>
      {isNavigating && <div className={STYLES.progressBar} role='progressbar' aria-label='Loading page' />}
      <Header />
      <main className={STYLES.main}>{children ?? <Outlet/>}</main>
      <Footer />
      <BottomNav />
    </div>
  );
};
