import prisma from '@/prisma/client'
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'

export async function POST(request: NextResponse) {
  const body = await request.json()
  const validation = z
    .object({
      serverId: z.string(),
    })
    .safeParse(body)

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const { serverId } = validation.data

  const server = await prisma.server.findUnique({ where: { id: serverId } })
  if (!server)
    return NextResponse.json({ error: 'Server not found.' }, { status: 404 })

  const newInviteCode = uuidv4()

  try {
    await prisma.server.update({
      where: { id: serverId },
      data: { inviteCode: newInviteCode },
    })
    return NextResponse.json(
      {
        data: {
          inviteCode: newInviteCode,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    )
  }
}
