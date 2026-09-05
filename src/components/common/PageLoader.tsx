import {Loader2} from "lucide-react";

/**
 * Suspense fallback loading indicator while page chunk is being fetched.
 */
export const PageLoader = () => (
  <div className="w-full h-[60vh] flex flex-col items-center justify-center">
    <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
    <p className="text-on-surface-variant font-medium">Loading page...</p>
  </div>
);
