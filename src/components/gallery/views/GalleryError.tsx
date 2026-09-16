import React from 'react';
import { ErrorState } from '@/components/common/ErrorState';

/**
 * Props for the GalleryError component.
 */
interface GalleryErrorProps {
  /** Error message describing failure reason. */
  message: string;
  /** Callback to trigger a retry of the fetch operation. */
  onRetry: () => void;
}

/**
 * Error boundary view for the gallery section.
 * Renders an ErrorState with retry capability without crashing the application shell.
 *
 * @param {GalleryErrorProps} props - Component properties.
 * @returns {React.JSX.Element} Configured ErrorState presentation.
 */
export const GalleryError: React.FC<GalleryErrorProps> = ({ message, onRetry }) => {
  return (
    <ErrorState
      title="Unable to Load Dog Breeds"
      message={message || 'A network error occurred while connecting to TheDogAPI. Please check your internet connection or API key.'}
      onRetry={onRetry}
    />
  );
};

