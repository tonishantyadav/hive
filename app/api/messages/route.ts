import { MessageWithMember } from '@/components/chat/ChatContent'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const take = 20

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const channelId = searchParams.get('channelId')
  const cursor = searchParams.get('cursor')

  if (!channelId)
    return NextResponse.json({ error: 'Invalid request.' }, { status: 404 })

  const chat = await prisma.chat.findUnique({ where: { channelId } })
  if (!chat) return NextResponse.json({}, { status: 200 })

  let messages: MessageWithMember[] = []

  try {
    if (cursor) {
      messages = await prisma.message.findMany({
        take,
        skip: 1,
        cursor: { id: cursor },
        where: {
          chatId: chat.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          member: {
            include: {
              user: true,
            },
          },
        },
      })
    } else {
      messages = await prisma.message.findMany({
        take,
        where: {
          chatId: chat.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          member: {
            include: {
              user: true,
            },
          },
        },
      })
    }
    const nextCursor = messages.length === take ? messages[take - 1].id : null
    return NextResponse.json({ messages, nextCursor }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    )
  }
}
