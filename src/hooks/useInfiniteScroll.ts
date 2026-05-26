import { useEffect, useRef, useState, useCallback } from 'react'

interface UseInfiniteScrollOptions {
  threshold?: number
  onLoadMore: () => void | Promise<void>
  hasMore: boolean
}

export function useInfiniteScroll({
  threshold = 200,
  onLoadMore,
  hasMore,
}: UseInfiniteScrollOptions) {
  const [isLoading, setIsLoading] = useState(false)
  const loadingRef = useRef(false)
  const observerRef = useRef<HTMLDivElement>(null)

  const handleLoadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore) return

    loadingRef.current = true
    setIsLoading(true)

    try {
      await onLoadMore()
    } finally {
      setIsLoading(false)
      loadingRef.current = false
    }
  }, [onLoadMore, hasMore])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingRef.current) {
          handleLoadMore()
        }
      },
      {
        rootMargin: `${threshold}px`,
      }
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => observer.disconnect()
  }, [handleLoadMore, hasMore, threshold])

  return {
    observerRef,
    isLoading,
  }
}
