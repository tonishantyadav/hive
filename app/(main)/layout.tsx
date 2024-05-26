import { ServerList } from '@/components/server'
import dynamic from 'next/dynamic'
import { ReactNode } from 'react'

const ServerCreateDialog = dynamic(
  () => import('@/components/server').then((mod) => mod.ServerCreateDialog),
  { loading: () => <p>Loading...</p> }
)

const UserButton = dynamic(
  () => import('@clerk/nextjs').then((mod) => mod.UserButton),
  { loading: () => <p>Loading...</p>, ssr: false }
)

export default function ServerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid h-screen md:grid-cols-[8%_95%] lg:grid-cols-[6%_94%]">
      <div className="hidden h-full w-full bg-black/35 md:inline-flex lg:inline-flex">
        <div className="flex h-full w-full flex-col items-center gap-4 py-2">
          <ServerCreateDialog />
          <div className="mx-auto h-[3px] w-10  rounded-full  bg-zinc-700" />
          <ServerList />
          <div className="mx-auto h-[3px] w-10  rounded-full  bg-zinc-700" />
          <UserButton
            appearance={{
              elements: {
                avatarBox: 'h-10 w-10',
              },
            }}
          />
        </div>
      </div>
      <div className="h-full w-full">{children}</div>
    </div>
  )
}
