import prisma from '@/prisma/client'
import { NextApiResponse } from '@/types/socket'
import { socketMessageUpdateKey } from '@/utils/query-key'
import { Message } from '@prisma/client'
import { NextApiRequest } from 'next'
import { z } from 'zod'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'DELETE' && req.method !== 'PATCH')
    return res.status(405).json({ error: 'Method not allowed.' })

  const validation = z
    .object({
      userId: z.string(),
      serverId: z.string(),
      channelId: z.string(),
      messageId: z.string(),
      messageContent: z.string().optional(),
    })
    .safeParse(req.body)

  if (!validation.success)
    return res.status(400).json({ error: 'Invalid request.' })

  const { userId, serverId, channelId, messageId, messageContent } =
    validation.data

  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) return res.status(401).json({ error: 'Unauthorized user.' })

  const server = await prisma.server.findUnique({ where: { id: serverId } })
  if (!server) return res.status(401).json({ error: 'Server not found.' })

  const channel = await prisma.channel.findUnique({ where: { id: channelId } })
  if (!channel) return res.status(404).json({ error: 'Channel not found' })

  const member = await prisma.member.findFirst({
    where: {
      userId,
      serverId,
    },
  })
  if (!member) return res.status(404).json({ error: 'Member not found.' })

  const chat = await prisma.chat.findUnique({ where: { channelId } })
  if (!chat) return res.status(404).json({ error: 'Chat not found.' })

  const message = await prisma.message.findUnique({
    where: {
      id: messageId,
    },
  })
  if (!message) return res.status(404).json({ error: 'Message not found.' })

  const owner = message.memberId === member.id
  const adminOrModerator =
    member.memberRole === 'ADMIN' || member.memberRole === 'MODERATOR'

  try {
    let updatedMessage: Message | null = null
    const queryKey = socketMessageUpdateKey(channelId, message.id)

    if (req.method === 'PATCH') {
      if (!owner) {
        return res.status(401).json({
          error: "You don't have permission to modify the message.",
        })
      }
      updatedMessage = await prisma.message.update({
        where: { id: message.id },
        data: {
          isEdited: true,
          message: messageContent,
        },
        include: {
          member: {
            include: {
              user: true,
            },
          },
        },
      })
    } else if (req.method === 'DELETE') {
      if (owner || adminOrModerator) {
        updatedMessage = await prisma.message.update({
          where: { id: message.id },
          data: { isEdited: false, isDeleted: true },
          include: {
            member: {
              include: {
                user: true,
              },
            },
          },
        })
      }
    }
    if (res?.socket?.server?.io) {
      res.socket.server.io.emit(queryKey, updatedMessage)
    } else {
      console.error('Socket.io server not initialized')
      return res.status(500).json({
        error: 'Server communication error. Please try again later.',
      })
    }
    return res.status(200).json(updatedMessage)
  } catch (error) {
    return res.status(500).json({ error: 'An unexpected error occurred.' })
  }
}
