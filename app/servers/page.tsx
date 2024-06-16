import prisma from '@/prisma/client'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const ServerPage = async () => {
  const { userId: clerkUserId } = auth()
  if (!clerkUserId) redirect('/')

  const user = await prisma.user.findUnique({ where: { clerkUserId } })
  if (!user) redirect('/')

  const myServer = await prisma.myServer.findUnique({
    where: { userId: user.id },
  })
  if (!myServer) redirect('/')

  const myChannel = await prisma.myChannel.findUnique({
    where: { myServerId: myServer.id },
  })
  if (!myChannel) redirect('/')

  redirect(`/servers/${myServer.id}/channels/${myChannel.id}`)
}

export default ServerPage
