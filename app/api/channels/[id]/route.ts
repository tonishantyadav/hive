import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

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
