import prisma from '@/prisma/client'
import { messageSchema } from '@/schemas/message'
import { NextApiResponse } from '@/types/socket'
import { getAuth } from '@clerk/nextjs/server'
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

  const { userId: clerkUserId } = getAuth(req)
  if (!clerkUserId) {
    return res
      .status(401)
      .json({ error: 'Unauthorized access. Please signin and try again.' })
  }

  const user = await prisma.user.findUnique({ where: { clerkUserId } })
  if (!user) {
    return res
      .status(401)
      .json({ error: 'User not found. Please signin with a valid account.' })
  }

  const validation = messageSchema.safeParse(req.body)
  if (!validation.success) {
    return res.status(400).json({
      error: 'Invalid request data. Please check your inputs and try again.',
      details: validation.error.issues,
    })
  }

  const { serverId, channelId, message, fileUrl } = validation.data

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
    // Find or create the chat for the channel
    let chat = await prisma.chat.findUnique({ where: { channelId } })
    if (!chat) chat = await prisma.chat.create({ data: { channelId } })

    // Create a new message
    const newMessage = await prisma.message.create({
      data: {
        chatId: chat.id,
        senderId: member.id,
        message,
        fileUrl,
      },
    })

    const channelKey = `chat:${channelId}:messages`

    // Ensure the io server is available before emitting the message
    if (res?.socket?.server?.io) {
      res.socket.server.io.emit(channelKey, newMessage)
    } else {
      console.error('Socket.io server not initialized')
      return res
        .status(500)
        .json({ error: 'Server communication error. Please try again later.' })
    }

    return res.status(200).json({})
  } catch (error) {
    console.error('Error processing request:', error)
    return res
      .status(500)
      .json({ error: 'An unexpected error occurred. Please try again later.' })
  }
}
