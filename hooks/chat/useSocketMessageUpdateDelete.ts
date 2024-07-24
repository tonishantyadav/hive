import { MessageWithMember } from '@/components/chat/ChatContent'
import { useSocket } from '@/providers/SocketProvider'
import { socketMessageUpdateKey } from '@/utils/query-key'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

export const useSocketMessageUpdateDelete = (
  channelId: string,
  messageId: string
) => {
  const queryClient = useQueryClient()
  const { socket } = useSocket()

  useEffect(() => {
    if (!socket) return

    const updateKey = socketMessageUpdateKey(channelId, messageId)

    socket.on(updateKey, (message: MessageWithMember) => {
      queryClient.setQueryData(['channel', channelId], (oldData: any) => {
        if (
          !oldData ||
          !oldData.pages.length ||
          !oldData.pages[0].messages.length
        )
          return oldData

        const newData = oldData.pages.map((page: any) => {
          return {
            ...page,
            messages: page.messages.map((m: MessageWithMember) =>
              m.id === message.id ? message : m
            ),
          }
        })

        return {
          ...oldData,
          pages: newData,
        }
      })
    })

    return () => {
      socket.off(updateKey)
    }
  }, [socket, queryClient, channelId, messageId])
}
