import {isRouteErrorResponse, useNavigate, useRouteError} from "react-router";
import {useAppDispatch} from "@/store/hooks.ts";
import {fetchBreeds} from "@/features/breeds/breedThunks.ts";
import {GalleryError} from "@/components/gallery/GalleryError.tsx";

export const GalleryErrorBoundary = () => {
  const error = useRouteError();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let message = 'Unable to communicate with TheDogAPI. Please check your connection.';

  if (isRouteErrorResponse(error)) {
    message = typeof error.data === 'string' ? error.data : error.statusText;
  } else if (error instanceof Error) {
    message = error.message;
  }

  const handleRetry = async () => {
    dispatch(fetchBreeds());
    navigate('.', { replace: true });
  };

  return <GalleryError message={message} onRetry={handleRetry} />
};

