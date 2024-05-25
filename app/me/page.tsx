import { ServerList } from '@/components/server'
import { Separator } from '@/components/ui/separator'
import { UserButton } from '@clerk/nextjs'
import dynamic from 'next/dynamic'

const ServerCreateDialog = dynamic(
  () => import('@/components/server').then((mod) => mod.ServerCreateDialog),
  { loading: () => <p>Loading...</p> }
)

const MyPage = () => {
  return (
    <div className="grid h-screen md:grid-cols-[8%_30%_62%] lg:grid-cols-[5%_30%_65%]">
      <div className="hidden h-full w-full justify-center bg-black/35 md:inline-flex lg:inline-flex">
        <div className="flex h-full w-full flex-col items-center gap-4  border-yellow-500 py-2">
          <ServerCreateDialog />
          <Separator className="mx-auto h-[2px] w-10 rounded-md bg-zinc-700" />
          <ServerList />
          <Separator className="mx-auto h-[2px] w-10 rounded-md bg-zinc-700" />
          <UserButton
            appearance={{
              elements: {
                avatarBox: 'h-10 w-10',
              },
            }}
          />
        </div>
      </div>
      <div className="hidden h-full w-full bg-black/10 p-3 md:inline-flex lg:inline-flex">
        Channel List
      </div>
      <div className="h-full w-full p-3">Message Box</div>
    </div>
  )
}

export default MyPage
