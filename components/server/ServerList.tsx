import { ServerItem } from '@/components/server'
import { Server } from '@prisma/client'

export const ServerList = async ({ servers }: { servers: Server[] }) => {
  return (
    <div className="hide-scrollbar h-[32rem] w-full  overflow-y-auto">
      <div className="flex flex-col items-center gap-3">
        {servers.map((server) => (
          <ServerItem
            serverId={server.id}
            serverImageUrl={server.imageUrl}
            key={server.id}
          />
        ))}
      </div>
    </div>
  )
}
