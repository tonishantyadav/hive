import { ServerCreateButton, ServerList } from '@/components/server'
import prisma from '@/prisma/client'
import { auth } from '@clerk/nextjs/server'
import dynamic from 'next/dynamic'
import { redirect } from 'next/navigation'

const UserButton = dynamic(() =>
  import('@clerk/nextjs').then((mod) => mod.UserButton)
)

export const ServerBox = async () => {
  const { userId: clerkUserId } = auth()
  if (!clerkUserId) redirect('/')

  const user = await prisma.user.findUnique({ where: { clerkUserId } })
  if (!user) redirect('/')

  const servers = await prisma.server.findMany({
    where: {
      serverMember: {
        some: {
          userId: user.id,
        },
      },
    },
  })

  return (
    <div className="hidden h-full w-full md:inline-flex lg:inline-flex">
      <div className="flex h-full w-full flex-col items-center gap-4 py-2">
        <ServerCreateButton />
        <div className="mx-auto h-[3px] w-10  rounded-full  bg-zinc-700" />
        <ServerList servers={servers} />
        <div className="mx-auto h-[3px] w-10  rounded-full  bg-zinc-700" />
        <UserButton
          appearance={{
            elements: {
              avatarBox: 'h-[2.61rem] w-[2.61rem]',
            },
          }}
        />
      </div>
    </div>
  )
}
