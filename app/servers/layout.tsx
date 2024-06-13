import { ServerBox } from '@/components/server'
import { ReactNode } from 'react'

export default function ServerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-full divide-x">
      <div className="hidden w-[100px] md:flex lg:flex">
        <ServerBox />
      </div>
      <div className="grow">{children}</div>
    </div>
  )
}
