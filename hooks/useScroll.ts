import { useScrollStore } from '@/stores/scroll'
import { ChatScroll } from '@/types/chat-scroll'
import { useEffect } from 'react'

export const useScroll = ({
  hasNextPage,
  isFetchingNextPage,
  containerRef,
  fetchNextPage,
}: ChatScroll) => {
  const { count, isScrolling, setIsScrolling } = useScrollStore()

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef && containerRef.current) {
        setIsScrolling(true)
        const { scrollTop, clientHeight, scrollHeight } = containerRef.current
        if (
          scrollTop >= 0 &&
          scrollTop <= 1 &&
          hasNextPage &&
          !isFetchingNextPage
        ) {
          const prevScrollTop = scrollTop
          fetchNextPage()
          if (containerRef.current)
            containerRef.current.scrollTop =
              prevScrollTop + containerRef.current.scrollHeight - scrollHeight
        }
      }
    }
    const currentContainerRef = containerRef?.current
    containerRef?.current?.addEventListener('scroll', handleScroll)
    return () => {
      currentContainerRef?.removeEventListener('scroll', handleScroll)
    }
  }, [
    containerRef,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    setIsScrolling,
  ])

  useEffect(() => {
    if (containerRef && containerRef.current && !isScrolling) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
      setIsScrolling(false)
    }
  }, [containerRef, count, isScrolling, setIsScrolling])
}
