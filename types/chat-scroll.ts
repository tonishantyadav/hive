import {
  InfiniteData,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query'

export type ChatScroll = {
  hasNextPage: boolean
  isFetchingNextPage?: boolean
  containerRef: React.RefObject<HTMLDivElement> | null
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>
}
