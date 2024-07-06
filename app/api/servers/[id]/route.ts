import { auth } from '@/auth'
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
      image: z.string(),
    })
    .safeParse(body)

  if (!validation.success || !params.id)
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })

  const { image } = validation.data

  const server = await prisma.server.findUnique({
    where: { id: params.id },
  })
  if (!server)
    return NextResponse.json({ error: 'Server not found.' }, { status: 404 })

  try {
    if (server.isDefault)
      await prisma.server.update({
        where: { id: server.id },
        data: { image },
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
  if (!params.id)
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })

  const session = await auth()
  if (!session || !session.user)
    return NextResponse.json({ error: 'Unauthorized user.' }, { status: 401 })

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
  })
  if (!user)
    return NextResponse.json({ error: 'Unauthorized user.' }, { status: 401 })

  const server = await prisma.server.findUnique({ where: { id: params.id } })
  if (!server)
    return NextResponse.json({ error: 'Server not found.' }, { status: 404 })

  const member = await prisma.member.findFirst({
    where: {
      userId: user.id,
      serverId: server.id,
    },
  })
  if (!member)
    return NextResponse.json({ error: 'Member not found.' }, { status: 404 })

  if (member.memberRole !== 'ADMIN')
    return NextResponse.json(
      {
        error: 'Only admin can delete the server.',
      },
      { status: 403 }
    )

  try {
    await prisma.server.delete({ where: { id: server.id } })
    return NextResponse.json({}, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    )
  }
}
