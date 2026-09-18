import {PageLoader} from "@/components/common/PageLoader";
import {type FC, Suspense} from "react";
import {Outlet} from "react-router";

const STYLES = {
  container: "w-full max-w-container-max mx-auto px-4 md:px-8 py-6 md:py-10",
  ambientWrapper: "fixed inset-0 pointer-events-none z-[-1] overflow-hidden",
  ambientGlowPrimary: "absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-container/10 rounded-full blur-[100px]",
  ambientGlowTertiary: "absolute bottom-1/4 right-0 w-80 h-80 bg-tertiary-container/10 rounded-full blur-[80px]",
}

/**
 * Base layout component for the Gallery feature section.
 * Provides the ambient background decoration and wraps the child routes
 * in a Suspense boundary for lazy loading.
 *
 * @returns {FC} The gallery layout wrapper component.
 */
export const GalleryLayout: FC = () => {
  return (
    <div className={STYLES.container}>
      {/* Ambient background glow decoration */}
      <div className={STYLES.ambientWrapper}>
        <div className={STYLES.ambientGlowPrimary} />
        <div className={STYLES.ambientGlowTertiary} />
      </div>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </div>
  )
};
