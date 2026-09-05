import React from 'react';
import { NavLink } from 'react-router';
import { ROUTES } from '@/constants/routes';

const STYLES = {
  nav: "md:hidden fixed bottom-0 w-full z-50 bg-surface/90 backdrop-blur-xl border-t border-secondary-fixed/30 pb-safe shadow-[0_-1px_8px_rgba(0,0,0,0.04)]",
  container: "flex justify-around items-center h-16 px-4",
  linkBase: "flex flex-col items-center justify-center gap-1 w-full h-full transition-colors",
  linkActive: "text-primary font-bold",
  linkInactive: "text-on-surface-variant hover:text-on-surface",
  icon: "material-symbols-outlined text-[24px]",
  label: "text-xs font-medium",
};

/**
 * Mobile Bottom Navigation Bar:
 * Displays only on small screens (md:hidden) for convenient one-handed thumb navigation.
 */
export const BottomNav: React.FC = () => {
  return (
    <nav className={STYLES.nav}>
      <div className={STYLES.container}>
        <NavLink
          to={ROUTES.HOME}
          end
          className={({ isActive }) =>
            `${STYLES.linkBase} ${
              isActive
                ? STYLES.linkActive
                : STYLES.linkInactive
            }`
          }
        >
          <span className={STYLES.icon}>home</span>
          <span className={STYLES.label}>Home</span>
        </NavLink>
        <NavLink
          to={ROUTES.GALLERY}
          className={({ isActive }) =>
            `${STYLES.linkBase} ${
              isActive
                ? STYLES.linkActive
                : STYLES.linkInactive
            }`
          }
        >
          <span className={STYLES.icon}>grid_view</span>
          <span className={STYLES.label}>Gallery</span>
        </NavLink>
      </div>
    </nav>
  );
};
