import { create } from 'zustand'

interface ScrollStore {
  count: Number
  isScrolling: boolean
  containerRef: React.RefObject<HTMLDivElement> | null
  setCount: (count: number) => void
  setIsScrolling: (isScrolling: boolean) => void
  setContainerRef: (containerRef: React.RefObject<HTMLDivElement>) => void
}

export const useScrollStore = create<ScrollStore>((set) => ({
  count: 0,
  isScrolling: false,
  containerRef: null,
  setCount: (count) => set({ count }),
  setIsScrolling: (isScrolling) => set({ isScrolling }),
  setContainerRef: (containerRef) => set({ containerRef }),
}))
