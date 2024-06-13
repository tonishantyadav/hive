import { SheetBox } from '@/components/SheetBox'
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
    <div className="grid h-full divide-x md:grid-cols-[300px,1fr] lg:grid-cols-[300px,1fr]">
      <div className="hidden flex-col gap-2 md:flex lg:flex">
        <ChannelBox server={server} userRole={user.userRole} />
      </div>
      <div className="flex flex-col gap-2 p-1">
        <div className="flex md:hidden lg:hidden">
          <SheetBox server={server} userRole={user.userRole} />
        </div>
        <div>Message Box</div>
      </div>
    </div>
  )
}

export default ServerPage
