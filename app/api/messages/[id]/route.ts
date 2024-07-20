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
      messageContent: z.string(),
    })
    .safeParse(body)

  if (!validation.success || !params.id)
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })

  const { messageContent } = validation.data

  const message = await prisma.message.findUnique({ where: { id: params.id } })
  if (!message)
    return NextResponse.json({ error: 'Message not found.' }, { status: 400 })

  try {
    await prisma.message.update({
      where: { id: message.id },
      data: {
        isEdited: true,
        message: messageContent,
      },
    })
    return NextResponse.json(200)
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

  const message = await prisma.message.findUnique({ where: { id: params.id } })
  if (!message)
    return NextResponse.json({ error: 'Message not found.' }, { status: 400 })

  try {
    await prisma.message.update({
      where: { id: message.id },
      data: { isEdited: false, isDeleted: true },
    })
    return NextResponse.json(200)
  } catch (error) {
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    )
  }
}
