import prisma from '@/prisma/client'
import { ServerCreateSchema } from '@/schemas/server'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuiv4 } from 'uuid'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const validation = ServerCreateSchema.safeParse(body)

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const { userId: clerkUserId } = auth()

  if (!clerkUserId)
    return NextResponse.json({ error: 'Unauthorized user.' }, { status: 401 })

  const user = await prisma.user.findUnique({ where: { clerkUserId } })

  if (!user)
    return NextResponse.json({ error: 'Unauthorized user.' }, { status: 401 })

  const { name, imageUrl } = validation.data

  try {
    if (imageUrl) {
      const server = await prisma.server.create({
        data: {
          name,
          imageUrl,
          inviteCode: uuiv4(),
          userId: user.id,
        },
      })
      return NextResponse.json(
        {
          data: {
            id: server.id,
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