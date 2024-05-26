import { ChannelHeader, ChannelBody } from '@/components/channel'
import { Server } from '@prisma/client'

export const ChannelContainer = ({ server }: { server: Server }) => {
  return (
    <div className=" hidden flex-col gap-2 bg-black/10 md:inline-flex lg:inline-flex">
      <ChannelHeader server={server} />
      <ChannelBody />
    </div>
  )
}
