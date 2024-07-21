import prisma from '@/prisma/client'
import { error } from 'console'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  const validation = z
    .object({
      channelName: z.string(),
    })
    .safeParse(body)

  const searchParams = request.nextUrl.searchParams
  const serverId = searchParams.get('serverId')

  if (!validation.success || !params.id || !serverId)
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })

  const { channelName } = validation.data

  const server = await prisma.server.findUnique({ where: { id: serverId } })
  if (!server)
    return NextResponse.json({ error: 'Server not found.' }, { status: 404 })

  const channel = await prisma.channel.findUnique({
    where: { id: params.id },
  })
  if (!channel)
    return NextResponse.json({ error: 'Channel not found.' }, { status: 404 })

  // Check if the channel exists with the same name or not
  const existingChannel = await prisma.channel.findFirst({
    where: {
      serverId,
      name: channelName,
    },
  })

  if (existingChannel)
    return NextResponse.json(
      { error: 'Channel name is already taken' },
      { status: 422 }
    )

  try {
    await prisma.channel.update({
      where: { id: channel.id },
      data: { name: channelName },
    })
    return NextResponse.json({ status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const searchParams = request.nextUrl.searchParams
  const serverId = searchParams.get('serverId')

  if (!serverId || !params.id)
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })

  const server = await prisma.server.findUnique({ where: { id: serverId } })
  if (!server)
    return NextResponse.json({ error: 'Server not found.' }, { status: 404 })

  const channel = await prisma.channel.findUnique({ where: { id: params.id } })
  if (!channel)
    return NextResponse.json({ error: 'Channel not found.' }, { status: 404 })

  const visitedChannel = await prisma.visitedChannel.findFirst({
    where: { channelId: channel.id },
  })

  try {
    if (visitedChannel)
      await prisma.visitedChannel.delete({ where: { id: visitedChannel.id } })
    await prisma.channel.delete({ where: { id: channel.id } })
    return NextResponse.json({ status: 200 })
  } catch (error) {
    return NextResponse.json(
      {
        error: 'An unexpected error occurred.',
      },
      { status: 500 }
    )
  }
}
