import React from 'react';
import { ErrorState } from '@/components/common/ErrorState';

interface GalleryErrorProps {
  message: string;
  onRetry: () => void;
}

export const GalleryError: React.FC<GalleryErrorProps> = ({ message, onRetry }) => {
  return (
    <ErrorState
      title="Unable to Load Dog Breeds"
      message={message || 'A network error occurred while connecting to TheDogAPI. Please check your internet connection or API key.'}
      onRetry={onRetry}
    />
  );
};
