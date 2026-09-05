import { useEffect, useState, useRef } from 'react';

/**
 * Options for configuring the `useInfiniteScroll` hook.
 */
interface UseInfiniteScrollOptions {
  /** Total number of items available in the filtered dataset */
  totalItems: number;
  /** Number of items to display per batch */
  pageSize: number;
  /** Margin around root bounding box for IntersectionObserver */
  rootMargin?: string;
}

/**
 * Custom hook implementing performant progressive loading (Infinite Scroll) using `IntersectionObserver`.
 * 
 * @param options - Total items count and batch page size configuration.
 * @returns Object with current visible item count, manual setter, and sentinel DOM ref.
 */
export function useInfiniteScroll({ totalItems, pageSize, rootMargin = '200px' }: UseInfiniteScrollOptions) {
  const [itemCount, setItemCount] = useState(pageSize);
  const [prevTotal, setPrevTotal] = useState(totalItems);
  const [prevPageSize, setPrevPageSize] = useState(pageSize);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Synchronize slice count during render when dataset length or pageSize changes (React recommended pattern)
  if (totalItems !== prevTotal || pageSize !== prevPageSize) {
    setPrevTotal(totalItems);
    setPrevPageSize(pageSize);
    setItemCount(pageSize);
  }

  // Set up IntersectionObserver on sentinel DOM element
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setItemCount((prev) => Math.min(prev + pageSize, totalItems));
        }
      },
      { rootMargin }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [totalItems, pageSize, rootMargin]);

  return { itemCount, setItemCount, sentinelRef };
}
