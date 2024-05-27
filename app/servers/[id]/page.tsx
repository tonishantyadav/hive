import { ChannelContainer } from '@/components/channel'
import prisma from '@/prisma/client'
import { notFound, redirect } from 'next/navigation'

const ServerPage = async ({ params }: { params: { id: string } }) => {
  const server = await prisma.server.findUnique({ where: { id: params.id } })
  if (!server) notFound()

  const user = await prisma.user.findUnique({ where: { id: server.userId } })
  if (!user) redirect('/')

  return (
    <div className="flex h-full w-full">
      <ChannelContainer server={server} user={user} />
      <div>Message Box</div>
    </div>
  )
}

export default ServerPage
