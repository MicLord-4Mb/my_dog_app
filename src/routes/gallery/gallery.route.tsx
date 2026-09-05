import {ROUTES} from "@/constants/routes";
import {GalleryPage} from "@/pages/GalleryPage";
import {GalleryErrorBoundary} from "@/routes/gallery/gallery.error";
import {galleryLoader} from "@/routes/gallery/gallery.loader";
import type {RouteObject} from "react-router";

export const galleryRoute: RouteObject[] = [
  {
    path:ROUTES.GALLERY,
    element:<GalleryPage />,
    loader: galleryLoader,
    errorElement: <GalleryErrorBoundary />,
  },
  {
    path:ROUTES.GALLERY_BREED,
    element:<GalleryPage />,
    loader: galleryLoader,
    errorElement: <GalleryErrorBoundary />,
  },
  {
    path:ROUTES.GALLERY_GRID,
    element:<GalleryPage />,
    loader: galleryLoader,
    errorElement: <GalleryErrorBoundary />,
  },
]