import { auth } from '@/auth'
import { ServerCreateButton, ServerList } from '@/components/server'
import prisma from '@/prisma/client'
import { redirect } from 'next/navigation'

export const ServerBox = async () => {
  const session = await auth()

  if (!session || !session.user) redirect('/')

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
  })
  if (!user) redirect('/')

  const servers = await prisma.server.findMany({
    where: {
      members: {
        some: {
          userId: user.id,
        },
      },
    },
    include: {
      channels: true,
    },
  })

  return (
    <div className="flex w-[80px] flex-col items-center gap-4 py-2 md:w-[100px] lg:w-[100px]">
      <ServerCreateButton />
      <div className="mx-auto h-[3px] w-10 rounded-full bg-zinc-700" />
      <ServerList userId={user.id} servers={servers} />
    </div>
  )
}
