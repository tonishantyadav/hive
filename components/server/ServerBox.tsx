import { ServerCreateButton, ServerList } from '@/components/server'
import prisma from '@/prisma/client'
import { UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

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
    <div className="hidden w-[100px] flex-col items-center gap-4 py-2 md:flex lg:flex">
      <ServerCreateButton />
      <div className="mx-auto h-[3px] w-10 rounded-full bg-zinc-700" />
      <ServerList servers={servers} />
    </div>
  )
}
