import { MessageWithMember } from '@/components/chat/ChatContent'
import { useSocket } from '@/providers/SocketProvider'
import { socketMessageAddKey } from '@/utils/query-key'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

export const useSocketMessageCreate = (channelId: string) => {
  const queryClient = useQueryClient()
  const { socket } = useSocket()

  useEffect(() => {
    if (!socket) return

    const addKey = socketMessageAddKey(channelId)

    socket.on(addKey, (message: MessageWithMember) => {
      queryClient.setQueryData(['channel', channelId], (oldData: any) => {
        if (
          !oldData ||
          !oldData.pages.length ||
          !oldData.pages[0].messages.length
        )
          return {
            pages: [
              {
                messages: [message],
                nextCursor: null,
              },
            ],
          }

        const newData = [...oldData.pages]
        newData[0] = {
          ...newData[0],
          messages: [message, ...newData[0].messages],
        }

        return {
          ...oldData,
          pages: newData,
        }
      })
    })
    return () => {
      socket.off(addKey)
    }
  }, [socket, queryClient, channelId])
}
