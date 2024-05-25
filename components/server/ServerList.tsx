import { ServerItem } from '@/components/server'
import prisma from '@/prisma/client'
import { auth } from '@clerk/nextjs/server'
import { notFound } from 'next/navigation'

export const ServerList = async () => {
  const { userId: clerkUserId } = auth()
  if (!clerkUserId) notFound()

  const user = await prisma.user.findUnique({ where: { clerkUserId } })
  if (!user) notFound()

  const servers = await prisma.server.findMany({
    where: {
      userId: user.id,
    },
  })

  return (
    <div className="hide-scrollbar h-[32rem] w-full  overflow-y-auto">
      <div className="flex flex-col items-center gap-3">
        {servers.map((server) => (
          <ServerItem server={server} key={server.id} />
        ))}
      </div>
    </div>
  )
}
