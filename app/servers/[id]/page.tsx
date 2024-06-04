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
    <div className="lg:grid-cols-[300px,1fr grid h-screen divide-x md:grid-cols-[300px,1fr]">
      <ChannelBox server={server} userRole={user.userRole} />
      <div>Message Box</div>
    </div>
  )
}

export default ServerPage
