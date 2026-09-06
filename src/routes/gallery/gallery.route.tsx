import {GalleryLayout} from "@/components/layout/GalleryLayout";
import {ROUTES} from "@/constants/routes";
import {GalleryErrorBoundary} from "@/routes/gallery/gallery.error";
import {galleryLoader} from "@/routes/gallery/gallery.loader";
import type {RouteObject} from "react-router";

export const galleryRoute: RouteObject =
  {
    path: ROUTES.GALLERY,
    id: 'gallery',
    loader: galleryLoader,
    errorElement: <GalleryErrorBoundary/>,
    element: <GalleryLayout/>,
    children: [
      {
        path: ROUTES.GALLERY,
        lazy: async () => {
          const { GalleryPage } = await import("@/pages/GalleryPage");
          return { Component: GalleryPage };
        },
      },
      {
        path: ROUTES.GALLERY_BREED,
        lazy: async () => {
          const { GalleryPage } = await import("@/pages/GalleryPage");
          return { Component: GalleryPage };
        },
      },
      {
        path: ROUTES.GALLERY_GRID,
        lazy: async () => {
          const { GalleryPage } = await import("@/pages/GalleryPage");
          return { Component: GalleryPage };
        },
      },
    ]
  };
