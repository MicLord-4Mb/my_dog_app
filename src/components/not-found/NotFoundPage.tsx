import React from 'react';
import { Link } from 'react-router';
import { ROUTES } from '@/constants/routes';
import { Button } from '@/components/ui/button';

const STYLES = {
  container: 'relative w-full min-h-[calc(100vh-10rem)] flex items-center justify-center text-center px-4 py-12 overflow-hidden',
  ambientGlow: 'absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 bg-primary-container/20 blur-3xl rounded-full pointer-events-none',
  contentWrap: 'w-full max-w-md flex flex-col items-center relative z-10',
  imageWrap: 'relative w-48 h-48 sm:w-56 sm:h-56 mb-8',
  image: 'w-full h-full object-cover rounded-3xl shadow-lg border border-secondary-fixed/40',
  pawBadge: 'absolute -bottom-3 -right-3 w-12 h-12 sm:w-14 sm:h-14 bg-surface rounded-full shadow-md flex items-center justify-center text-primary border border-secondary-fixed/30',
  pawIcon: 'material-symbols-outlined text-[24px] sm:text-[28px]',
  heading: 'font-headline text-3xl sm:text-4xl font-extrabold text-on-surface mb-3 tracking-tight',
  description: 'text-sm sm:text-base text-on-surface-variant mb-8 max-w-xs leading-relaxed',
  button: 'rounded-full shadow-md px-8 flex items-center gap-2',
  buttonIcon: 'material-symbols-outlined text-[20px]',
};

/**
 * 404 Not Found Page Component:
 * Displays friendly runaway dog illustration, helpful message, and button returning to Home.
 *
 * @returns {React.JSX.Element} Responsive not found state view.
 */
export const NotFoundPage: React.FC = () => {
  return (
    <div className={STYLES.container}>
      {/* Ambient background glow */}
      <div className={STYLES.ambientGlow} />

      <div className={STYLES.contentWrap}>
        {/* Confused Dog Image */}
        <div className={STYLES.imageWrap}>
          <img
            src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80"
            alt="Confused cute puppy"
            className={STYLES.image}
          />
          {/* Floating paw print icon */}
          <div className={STYLES.pawBadge}>
            <span className={STYLES.pawIcon}>
              pets
            </span>
          </div>
        </div>

        {/* Text content */}
        <h1 className={STYLES.heading}>
          404 - Page Not Found
        </h1>
        <p className={STYLES.description}>
          Oops! It looks like this page has run away. Let's get you back home to safety.
        </p>

        {/* Action button */}
        <Button asChild size="lg" className={STYLES.button}>
          <Link to={ROUTES.HOME}>
            <span className={STYLES.buttonIcon}>home</span>
            <span>Back to Home</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

