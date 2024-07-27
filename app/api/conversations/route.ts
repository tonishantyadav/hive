import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const validation = z
    .object({
      senderId: z.string(),
      receiverId: z.string(),
    })
    .safeParse(body)

  if (!validation.success)
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })

  const { senderId, receiverId } = validation.data

  const sender = await prisma.member.findUnique({ where: { id: senderId } })
  if (!sender)
    return NextResponse.json({ error: 'Unauthorized sender.' }, { status: 404 })

  const receiver = await prisma.member.findUnique({ where: { id: receiverId } })
  if (!receiver)
    return NextResponse.json(
      { error: 'Unauthorized receiver.' },
      { status: 404 }
    )

  try {
    const coversation = await prisma.conversation.create({
      data: {
        senderId: sender.id,
        receiverId: receiver.id,
      },
    })
    return NextResponse.json(
      { conversationId: coversation.id },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    )
  }
}
