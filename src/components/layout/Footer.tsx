import {Link} from "react-router";
import {LINKS} from "@/constants/routes";

const STYLES = {
  footer: "w-full bg-surface-container py-10 md:py-12 border-t border-secondary-fixed/30 mt-auto mb-16 md:mb-0",
  container: "max-w-container-max mx-auto px-4 md:px-8",
  content: "flex flex-col md:flex-row justify-between items-center gap-6",
  brand: "flex items-center gap-2.5",
  brandLogo: "w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center",
  brandIcon: "material-symbols-outlined text-primary text-[18px]",
  brandTitle: "font-headline text-base font-bold text-on-surface-variant",
  nav: "flex items-center gap-6 text-xs text-on-secondary-container",
  navLink: "hover:text-primary transition-colors",
  navAction: "hover:text-primary transition-colors cursor-pointer",
  copyright: "text-xs text-on-secondary-container opacity-70",
};

/**
 * Footer component:
 * Displays brand mark, navigation links, API attribution, and copyright.
 */
export const Footer = () => {
  return (
    <footer className={STYLES.footer}>
      <div className={STYLES.container}>
        <div className={STYLES.content}>
          <div className={STYLES.brand}>
            <div className={STYLES.brandLogo}>
              <span className={STYLES.brandIcon}>pets</span>
            </div>
            <span className={STYLES.brandTitle}>
              Dog Gallery
            </span>
          </div>

          <nav className={STYLES.nav}>
            <Link to={LINKS.home()} className={STYLES.navLink}>
              Home
            </Link>
            <Link to={LINKS.gallery()} className={STYLES.navLink}>
              Gallery
            </Link>
            <span className={STYLES.navAction}>
              Privacy
            </span>
            <span className={STYLES.navAction}>
              API
            </span>
          </nav>

          <p className={STYLES.copyright}>
            © {new Date().getFullYear()} Dog Gallery. Built with React Router, Redux & TheDogAPI.
          </p>
        </div>
      </div>
    </footer>
  );
};
