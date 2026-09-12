import React from 'react';
import { Link } from 'react-router';
import { ROUTES } from '@/constants/routes';
import { Button } from '@/components/ui/button';

/**
 * 404 Not Found Page Component:
 * Displays friendly runaway dog illustration, helpful message, and button returning to Home.
 */
export const NotFoundPage: React.FC = () => {
  return (
    <div className="relative w-full min-h-[calc(100vh-10rem)] flex items-center justify-center text-center px-4 py-12 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 bg-primary-container/20 blur-3xl rounded-full pointer-events-none" />

      <div className="w-full max-w-md flex flex-col items-center relative z-10">
        {/* Confused Dog Image */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 mb-8">
          <img
            src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80"
            alt="Confused cute puppy"
            className="w-full h-full object-cover rounded-3xl shadow-lg border border-secondary-fixed/40"
          />
          {/* Floating paw print icon */}
          <div className="absolute -bottom-3 -right-3 w-12 h-12 sm:w-14 sm:h-14 bg-surface rounded-full shadow-md flex items-center justify-center text-primary border border-secondary-fixed/30">
            <span className="material-symbols-outlined text-[24px] sm:text-[28px]">
              pets
            </span>
          </div>
        </div>

        {/* Text content */}
        <h1 className="font-headline text-3xl sm:text-4xl font-extrabold text-on-surface mb-3 tracking-tight">
          404 - Page Not Found
        </h1>
        <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-xs leading-relaxed">
          Oops! It looks like this page has run away. Let's get you back home to safety.
        </p>

        {/* Action button */}
        <Button asChild size="lg" className="rounded-full shadow-md px-8 flex items-center gap-2">
          <Link to={ROUTES.HOME}>
            <span className="material-symbols-outlined text-[20px]">home</span>
            <span>Back to Home</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};
