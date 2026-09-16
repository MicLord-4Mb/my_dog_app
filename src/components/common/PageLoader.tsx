import React from 'react';
import { Loader2 } from "lucide-react";

const STYLES = {
  container: "w-full h-[60vh] flex flex-col items-center justify-center",
  spinner: "w-10 h-10 text-primary animate-spin mb-4",
  text: "text-on-surface-variant font-medium",
};

/**
 * Suspense fallback loading indicator displayed while an asynchronous route or chunk is being fetched.
 *
 * @returns {React.JSX.Element} Centered full-height loader with spinning icon and descriptive label.
 */
export const PageLoader: React.FC = () => (
  <div className={STYLES.container}>
    <Loader2 className={STYLES.spinner} />
    <p className={STYLES.text}>Loading page...</p>
  </div>
);

