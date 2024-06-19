import { DefaultServer, ServerItem } from '@/components/server'
import { Channel, Server } from '@prisma/client'
import { notFound } from 'next/navigation'

interface ServerWithChannels extends Server {
  channels: Channel[]
}

interface ServerListProps {
  userId: string
  servers: ServerWithChannels[]
}

export const ServerList = ({ userId, servers }: ServerListProps) => {
  const defaultServer = servers.find((server) => server.isDefault)
  if (!defaultServer) notFound()

  const generalChannel = defaultServer.channels.find((ch) => ch.isDefault)
  if (!generalChannel) notFound()

  const filteredServers = servers.filter((server) => !server.isDefault)

  return (
    <div className="hide-scrollbar h-[32rem] w-full overflow-y-auto">
      <div className="flex flex-col items-center gap-3">
        <DefaultServer
          userId={userId}
          serverId={defaultServer.id}
          serverName={defaultServer.name}
          serverImage={defaultServer.imageUrl}
          channelId={generalChannel.id}
        />
        {filteredServers.map((server) => (
          <ServerItem
            key={server.id}
            serverId={server.id}
            serverName={server.name}
            serverImageUrl={server.imageUrl}
            channelId={server.channels.find((ch) => ch.name === 'general')?.id}
          />
        ))}
      </div>
    </div>
  )
}
