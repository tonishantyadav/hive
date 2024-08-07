import prisma from '@/prisma/client'
import { MessageSchema } from '@/schemas/message'
import { NextApiResponse } from '@/types/socket'
import { socketMessageAddKey } from '@/utils/query-key'
import { NextApiRequest } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ error: 'Method not allowed. Please use POST request.' })
  }

  const validation = MessageSchema.safeParse(req.body)
  if (!validation.success) {
    return res.status(400).json({
      error: 'Invalid request.',
    })
  }

  const { userId, serverId, channelId, message, fileUrl } = validation.data

  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized user.' })
  }

  if (!message && !fileUrl)
    return res.status(400).json({
      error: 'Invalid request.',
    })

  const server = await prisma.server.findFirst({
    where: {
      id: serverId,
      members: {
        some: {
          userId: user.id,
        },
      },
    },
  })
  if (!server) {
    return res.status(404).json({
      error: 'Server not found.',
    })
  }

  const channel = await prisma.channel.findUnique({
    where: { id: channelId },
  })
  if (!channel) {
    return res.status(404).json({
      error: 'Channel not found.',
    })
  }

  const member = await prisma.member.findFirst({
    where: {
      serverId,
      userId: user.id,
    },
  })
  if (!member) {
    return res.status(404).json({
      error:
        'You are not a member of this server. Please join the server and try again.',
    })
  }

  try {
    let chat = await prisma.chat.findUnique({ where: { channelId } })
    if (!chat) chat = await prisma.chat.create({ data: { channelId } })

    const newMessage = await prisma.message.create({
      data: {
        chatId: chat.id,
        memberId: member.id,
        message,
        fileUrl,
      },
      include: {
        member: {
          include: {
            user: true,
          },
        },
      },
    })

    const key = socketMessageAddKey(channelId)

    if (res?.socket?.server?.io) {
      res.socket.server.io.emit(key, newMessage)
    } else {
      console.error('Socket.io server not initialized')
      return res
        .status(500)
        .json({ error: 'Server communication error. Please try again later.' })
    }

    return res.status(200).json(newMessage)
  } catch (error) {
    console.error('Error processing request:', error)
    return res.status(500).json({ error: 'An unexpected error occurred.' })
  }
}
