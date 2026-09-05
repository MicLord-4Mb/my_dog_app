import React from 'react';
import { NavLink, useLocation } from 'react-router';
import { ROUTES } from '@/constants/routes';

const STYLES = {
  header: "fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl border-b border-secondary-fixed/30 pt-safe transition-all shadow-[0_1px_8px_rgba(0,0,0,0.04)]",
  container: "h-16 md:h-20 max-w-container-max mx-auto px-4 md:px-8 flex items-center justify-between",
  brandSection: "flex items-center gap-3 md:gap-4",
  brandLink: "flex items-center gap-2.5 group",
  brandIconWrapper: "w-9 h-9 md:w-10 md:h-10 rounded-xl bg-primary-container flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform",
  brandIcon: "material-symbols-outlined text-on-primary-container text-[22px]",
  brandTitle: "font-headline text-xl md:text-2xl font-bold text-primary tracking-tight",
  desktopNav: "hidden md:flex items-center gap-8 ml-8",
  navLinkBase: "text-sm font-semibold transition-colors px-2 py-1 rounded-md",
  navLinkActive: "text-primary font-bold",
  navLinkInactive: "text-on-secondary-container hover:text-on-surface",
  rightActions: "flex items-center gap-3",
  toggleButton: "inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 hover:bg-primary/20 px-3.5 py-1.5 rounded-full transition-colors shadow-2xs",
  toggleIcon: "material-symbols-outlined text-[16px]",
  toggleLabel: "hidden sm:inline",
  avatar: "w-9 h-9 md:w-10 md:h-10 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-sm hover:opacity-90 transition-opacity cursor-pointer",
  avatarIcon: "material-symbols-outlined text-[18px] md:text-[20px]",
};

/**
 * Top navigation Header component:
 * - Brand logo linking to home.
 * - Desktop navigation links (Home, Gallery).
 * - View mode toggle button ("Single View" vs "Explore Breeds").
 * - User profile icon.
 */
export const Header: React.FC = () => {
  const location = useLocation();
  const isGridMode = location.pathname.startsWith('/gallery/grid');

  return (
    <header className={STYLES.header}>
      <div className={STYLES.container}>
        {/* Brand */}
        <div className={STYLES.brandSection}>
          <NavLink to={ROUTES.HOME} className={STYLES.brandLink}>
            <div className={STYLES.brandIconWrapper}>
              <span className={STYLES.brandIcon}>pets</span>
            </div>
            <span className={STYLES.brandTitle}>
              Dog Gallery
            </span>
          </NavLink>

          {/* Desktop Navigation Links */}
          <nav className={STYLES.desktopNav}>
            <NavLink
              to={ROUTES.HOME}
              className={({ isActive }) =>
                `${STYLES.navLinkBase} ${
                  isActive
                    ? STYLES.navLinkActive
                    : STYLES.navLinkInactive
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to={ROUTES.GALLERY}
              className={({ isActive }) =>
                `${STYLES.navLinkBase} ${
                  isActive && !isGridMode
                    ? STYLES.navLinkActive
                    : STYLES.navLinkInactive
                }`
              }
            >
              Gallery
            </NavLink>
          </nav>
        </div>

        {/* Right action / Mode switch toggle button & user avatar */}
        <div className={STYLES.rightActions}>
          <NavLink
            to={isGridMode ? ROUTES.GALLERY : ROUTES.GALLERY_GRID}
            className={STYLES.toggleButton}
            title={isGridMode ? "Switch to single breed view" : "Switch to catalog grid view"}
          >
            <span className={STYLES.toggleIcon}>
              {isGridMode ? 'view_agenda' : 'grid_view'}
            </span>
            <span className={STYLES.toggleLabel}>
              {isGridMode ? 'Single View' : 'Explore Breeds'}
            </span>
          </NavLink>
          <div
            title="Dog Enthusiast"
            className={STYLES.avatar}
          >
            <span className={STYLES.avatarIcon}>person</span>
          </div>
        </div>
      </div>
    </header>
  );
};
