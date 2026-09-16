import {NavLink, useLocation} from "react-router";
import {LINKS, ROUTES, FAVORITES_GROUP_KEY} from "@/constants/routes";

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
 *
 * @returns {React.JSX.Element} Responsive bottom navigation dock.
 */
export const BottomNav: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isFavoritesActive = location.pathname.startsWith(ROUTES.GALLERY) && searchParams.get('group') === FAVORITES_GROUP_KEY;
  const isGalleryActive = location.pathname.startsWith(ROUTES.GALLERY) && !isFavoritesActive;
  const isBooksActive = location.pathname.startsWith(ROUTES.BOOKS);
  const isHomeActive = location.pathname === ROUTES.HOME;

  return (
    <nav className={STYLES.nav}>
      <div className={STYLES.container}>
        <NavLink
          to={LINKS.home()}
          className={`${STYLES.linkBase} ${isHomeActive ? STYLES.linkActive : STYLES.linkInactive}`}
        >
          <span className={STYLES.icon}>home</span>
          <span className={STYLES.label}>Home</span>
        </NavLink>
        <NavLink
          to={LINKS.gallery()}
          className={`${STYLES.linkBase} ${isGalleryActive ? STYLES.linkActive : STYLES.linkInactive}`}
        >
          <span className={STYLES.icon}>grid_view</span>
          <span className={STYLES.label}>Gallery</span>
        </NavLink>
        <NavLink
          to={LINKS.books()}
          className={`${STYLES.linkBase} ${isBooksActive ? STYLES.linkActive : STYLES.linkInactive}`}
        >
          <span className={STYLES.icon}>menu_book</span>
          <span className={STYLES.label}>Books</span>
        </NavLink>
        <NavLink
          to={LINKS.favorites()}
          className={`${STYLES.linkBase} ${isFavoritesActive ? STYLES.linkActive : STYLES.linkInactive}`}
        >
          <span
            className={STYLES.icon}
            style={{ fontVariationSettings: isFavoritesActive ? "'FILL' 1" : "'FILL' 0" }}
          >
            favorite
          </span>
          <span className={STYLES.label}>Favorites</span>
        </NavLink>
      </div>
    </nav>
  );
};

