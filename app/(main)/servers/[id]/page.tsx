import { ChannelContainer } from '@/components/channel'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'

const ServerPage = async ({ params }: { params: { id: string } }) => {
  const server = await prisma.server.findUnique({ where: { id: params.id } })

  if (!server) notFound()

  return (
    <div className="grid h-full w-full grid-cols-[20%_60%]">
      <ChannelContainer server={server} />
      <div className="p-3">Message Box</div>{' '}
    </div>
  )
}

export default ServerPage
