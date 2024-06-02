import { ServerBox } from '@/components/server'
import { ReactNode } from 'react'

export default function ServerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid h-screen grid-cols-[100px,1fr] divide-x">
      <ServerBox />
      <div className="h-full w-full">{children}</div>
    </div>
  )
}
