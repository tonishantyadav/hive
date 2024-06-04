import { ServerBox } from '@/components/server'
import { ReactNode } from 'react'

export default function ServerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full w-full divide-x">
      <ServerBox />
      <div className="grow">{children}</div>
    </div>
  )
}
