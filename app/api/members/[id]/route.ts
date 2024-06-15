import prisma from '@/prisma/client'
import { UserRole } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  const validation = z
    .object({
      memberRole: z.nativeEnum(UserRole),
    })
    .safeParse(body)

  if (!validation.success)
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })

  const { memberRole } = validation.data

  const user = await prisma.user.findUnique({
    where: { id: params.id },
  })
  if (!user)
    return NextResponse.json({ error: 'Member not found.' }, { status: 404 })

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: { userRole: memberRole },
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
      userId: params.id,
      serverId,
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
