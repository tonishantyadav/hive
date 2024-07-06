import prisma from '@/prisma/client'
import { MemberRole } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  const validation = z
    .object({
      serverId: z.string(),
      memberRole: z.nativeEnum(MemberRole),
    })
    .safeParse(body)

  if (!validation.success)
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })

  const { serverId, memberRole } = validation.data

  const member = await prisma.member.findFirst({
    where: {
      serverId,
      userId: params.id,
    },
  })
  if (!member)
    return NextResponse.json({ error: 'Member not found.' }, { status: 404 })

  try {
    prisma.member.update({ where: { id: member.id }, data: { memberRole } })
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
  const body = await request.json()
  const validation = z
    .object({
      serverId: z.string(),
    })
    .safeParse(body)

  if (!validation.success)
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })

  const { serverId } = validation.data

  const member = await prisma.member.findFirst({
    where: {
      serverId,
      userId: params.id,
    },
  })
  if (!member)
    return NextResponse.json({ error: 'Member not found.' }, { status: 404 })

  try {
    await prisma.member.delete({
      where: {
        id: member.id,
      },
    })
    return NextResponse.json({}, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    )
  }
}
