import prisma from '@/prisma/client'
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

  try {
    await prisma.channel.update({
      where: { id: channel.id },
      data: { name: channelName },
    })
    return NextResponse.json({}, { status: 200 })
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

  try {
    await prisma.channel.delete({ where: { id: channel.id } })
    return NextResponse.json({}, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      {
        error: 'An unexpected error occurred.',
      },
      { status: 500 }
    )
  }
}
