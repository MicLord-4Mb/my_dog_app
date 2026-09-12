import {Button} from "@/components/ui/button";
import {LINKS} from "@/constants/routes";
import {NotFoundPage} from "@/components/not-found/NotFoundPage";
import {isRouteErrorResponse, Link, useRevalidator, useRouteError} from "react-router";

const STYLES = {
  container: "min-h-[70vh] flex flex-col items-center justify-center text-center p-6 sm:p-12",
  card: "w-full max-w-lg bg-surface-container-low border border-error/20 rounded-3xl p-8 sm:p-10 shadow-lg flex flex-col items-center gap-6 animate-fade-in",
  iconWrapper: "w-16 h-16 rounded-2xl bg-error/10 text-error flex items-center justify-center",
  icon: "material-symbols-outlined text-[36px]",
  title: "font-headline text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight",
  description: "text-sm sm:text-base text-on-surface-variant max-w-sm leading-relaxed",
  actionsRow: "flex items-center gap-3 pt-2 flex-wrap justify-center",
  primaryBtn: "rounded-full shadow-md px-6 flex items-center gap-2",
  secondaryBtn: "rounded-full px-6 flex items-center gap-2",
  errorDetails: "mt-4 p-3 bg-surface-container-highest rounded-xl text-left text-xs font-mono text-on-surface-variant overflow-x-auto max-w-full w-full",
};

/**
 * Root Error Boundary for React Router Data API.
 * Gracefully handles route errors, network failures, and thrown loader/action responses.
 */
export const RootErrorBoundary = () => {
  const error = useRouteError();
  const revalidator = useRevalidator();

  let title = 'Something Went Wrong';
  let message = 'An unexpected error occurred while processing your request. Please try again.';

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <NotFoundPage />
    } else {
      title = `${error.status} ${error.statusText || 'Error'}`;
      message = typeof error.data === 'string' ? error.data : error.data?.message || message;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className={STYLES.container}>
      <div className={STYLES.card}>
        <div className={STYLES.iconWrapper}>
          <span className={STYLES.icon}>ERROR</span>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className={STYLES.title}>{title}</h1>
          <p className={STYLES.description}>{message}</p>
        </div>

        <div className={STYLES.actionsRow}>
          <Button
            variant="default"
            onClick={() => revalidator.revalidate()}
            disabled={revalidator.state === 'loading'}
            className={STYLES.primaryBtn}
          >
            <span className="material-symbols-outlined text-[18px]">
              {revalidator.state === 'loading' ? 'hourglass_top' : 'refresh'}
            </span>
            {revalidator.state === 'loading' ? 'Retrying...' : 'Try Again'}
          </Button>

          <Button asChild variant='outline' className={STYLES.secondaryBtn}>
            <Link to={LINKS.home()}>
              <span className="material-symbols-outlined text-[18px]">home</span>
              Go to Home
            </Link>
          </Button>
        </div>

        {import.meta.env.DEV && error instanceof Error && error.stack && (
          <details className={STYLES.errorDetails}>
            <summary className="cursor-pointer font-semibold mb-1">Error Stack Trace</summary>
            <pre className="whitespace-pre-wrap">{error.stack}</pre>
          </details>
        )}
      </div>
    </div>
  );
};
