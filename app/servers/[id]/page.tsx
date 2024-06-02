import { ChannelBox } from '@/components/channel'
import prisma from '@/prisma/client'
import { auth } from '@clerk/nextjs/server'
import { notFound, redirect } from 'next/navigation'

const ServerPage = async ({ params }: { params: { id: string } }) => {
  const { userId: clerkUserId } = auth()
  if (!clerkUserId) return redirect('/')

  const user = await prisma.user.findUnique({ where: { clerkUserId } })
  if (!user) return redirect('/')

  const server = await prisma.server.findUnique({ where: { id: params.id } })
  if (!server) notFound()

  return (
    <div className="grid h-full w-full grid-cols-[300px,1fr] divide-x">
      <ChannelBox server={server} userRole={user.userRole} />
      <div className="h-full w-full">Message container</div>
    </div>
  )
}

export default ServerPage
