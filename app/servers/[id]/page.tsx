import { ChannelContainer } from '@/components/channel'
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
    <div className="flex h-full w-full">
      <ChannelContainer server={server} user={user} />
      <div className="w-full">Message Box</div>
    </div>
  )
}

export default ServerPage
