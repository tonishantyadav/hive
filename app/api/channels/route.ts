import prisma from '@/prisma/client'
import { ChannelCreateSchema } from '@/schemas/channel'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const serverId = searchParams.get('server')

  const { userId: clerkUserId } = auth()
  if (!clerkUserId)
    return NextResponse.json({ error: 'Unauthorized user.' }, { status: 401 })

  const user = await prisma.user.findUnique({ where: { clerkUserId } })
  if (!user)
    return NextResponse.json({ error: 'Unauthorized user.' }, { status: 401 })

  const server = await prisma.server.findUnique({
    where: { id: serverId! },
  })

  if (!server)
    return NextResponse.json({ error: 'Server not found.' }, { status: 404 })

  try {
    const channels = await prisma.channel.findMany({
      where: {
        serverId: server.id,
        channelMember: {
          some: {
            userId: user.id,
          },
        },
      },
    })
    return NextResponse.json({ data: channels }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextResponse) {
  const body = await request.json()
  const validation = ChannelCreateSchema.safeParse(body)

  if (!validation.success)
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })

  const { serverId, channelName, channelCategory } = validation.data

  const server = await prisma.server.findUnique({
    where: { id: serverId },
  })
  if (!server)
    return NextResponse.json({ error: 'Server not found.' }, { status: 404 })

  if (channelName === 'general')
    return NextResponse.json(
      { error: "Channel name cannot be 'general'." },
      { status: 422 }
    )

  try {
    if (serverId) {
      const channel = await prisma.channel.create({
        data: {
          serverId,
          channelCategory,
          name: channelName,
        },
      })
      return NextResponse.json(
        {
          data: {
            id: channel.id,
          },
        },
        { status: 200 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    )
  }
}
