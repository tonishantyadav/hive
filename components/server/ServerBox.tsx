import { MyServer, ServerCreateButton, ServerList } from '@/components/server'
import prisma from '@/prisma/client'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export const ServerBox = async () => {
  const { userId: clerkUserId } = auth()
  if (!clerkUserId) redirect('/')

  const user = await prisma.user.findUnique({ where: { clerkUserId } })
  if (!user) redirect('/')

  const myServer = await prisma.myServer.findUnique({
    where: { userId: user.id },
  })
  if (!myServer) redirect('/')

  const servers = await prisma.server.findMany({
    where: {
      member: {
        some: {
          userId: user.id,
        },
      },
    },
  })

  return (
    <div className="flex w-[80px] flex-col items-center gap-4 py-2 md:w-[100px] lg:w-[100px]">
      <ServerCreateButton />
      <MyServer
        userId={user.id}
        myServerId={myServer.id}
        myServerName={myServer.name}
        myServerImage={myServer.imageUrl}
      />
      <div className="mx-auto h-[3px] w-10 rounded-full bg-zinc-700" />
      <ServerList servers={servers} />
    </div>
  )
}
