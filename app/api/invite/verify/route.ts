import { auth } from '@/auth'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const validation = z
    .object({
      inviteCode: z.string(),
    })
    .safeParse(body)

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const { inviteCode } = validation.data

  const session = await auth()

  if (!session || !session.user)
    return NextResponse.json(
      {
        error: 'Access Denied! You must sign in before joining the server.',
      },
      { status: 404 }
    )

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
  })
  if (!user)
    return NextResponse.json(
      {
        error: 'Access Denied! You must sign in before joining the server.',
      },
      { status: 404 }
    )

  const server = await prisma.server.findUnique({
    where: { inviteCode },
  })
  if (!server)
    return NextResponse.json({ error: 'Server not found.' }, { status: 404 })

  if (server.inviteCode !== inviteCode)
    return NextResponse.json(
      { error: 'Invalid server invite code.' },
      { status: 404 }
    )

  try {
    const member = await prisma.member.findFirst({
      where: {
        userId: user.id,
        serverId: server.id,
      },
    })
    if (!member) {
      await prisma.member.create({
        data: {
          serverId: server.id,
          userId: user.id,
        },
      })
    }
    return NextResponse.json({ data: { serverId: server.id } }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    )
  }
}
