"use client";

import { useEffect, useRef, useCallback } from "react";

type UseInfiniteScrollProps = {
  page: number;
  setPage: (page: number) => void;
  isLoading: boolean;
  hasMore: boolean;
  threshold?: number;
  delay?: number;
};

export function useInfiniteScroll({
  page,
  setPage,
  isLoading,
  hasMore,
  threshold = 500,
  delay = 1000,
}: UseInfiniteScrollProps) {
  const observerTarget = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const lastFetchTime = useRef<number>(0);
  const lastTriggeredPage = useRef<number>(0);
  const hasTriggered = useRef<boolean>(false);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;

      // Only proceed if element is intersecting, not loading, has more content, and hasn't already triggered
      if (entry.isIntersecting && !isLoading && hasMore && !hasTriggered.current) {
        hasTriggered.current = true;

        // Check if enough time has passed since last fetch
        const now = Date.now();
        const timeSinceLastFetch = now - lastFetchTime.current;

        if (timeSinceLastFetch < delay) {
          // Clear previous timer if exists
          if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
          }

          // Set new timer for delayed fetch
          debounceTimer.current = setTimeout(() => {
            lastFetchTime.current = Date.now();
            lastTriggeredPage.current = page;
            setPage(page + 1);
          }, delay - timeSinceLastFetch);
        } else {
          // Enough time has passed, fetch immediately
          lastFetchTime.current = Date.now();
          lastTriggeredPage.current = page;
          setPage(page + 1);
        }
      }

      // Reset trigger flag when element is no longer intersecting
      if (!entry.isIntersecting) {
        hasTriggered.current = false;
      }
    },
    [page, isLoading, hasMore, setPage, delay]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: `${threshold}px`,
    });

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(observerTarget.current);
      }
      // Clean up timer on unmount
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [handleIntersection, threshold]);

  return observerTarget;
}
