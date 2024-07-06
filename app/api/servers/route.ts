import { auth } from '@/auth'
import prisma from '@/prisma/client'
import { ServerCreateSchema } from '@/schemas/server'
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const validation = ServerCreateSchema.safeParse(body)

  if (!validation.success)
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })

  const session = await auth()

  if (!session || !session.user)
    return NextResponse.json({ error: 'Unauthorized user.' }, { status: 401 })

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
  })

  if (!user)
    return NextResponse.json({ error: 'Unauthorized user.' }, { status: 401 })

  const { name, image } = validation.data

  try {
    if (image) {
      const result = await prisma.$transaction(async (prisma) => {
        const server = await prisma.server.create({
          data: {
            name,
            image,
            inviteCode: uuidv4(),
          },
        })
        const channel = await prisma.channel.create({
          data: {
            serverId: server.id,
            name: 'general',
            isDefault: true,
          },
        })
        const member = await prisma.member.create({
          data: {
            userId: user.id,
            serverId: server.id,
            memberRole: 'ADMIN',
          },
        })
        return { id: server.id }
      })
      return NextResponse.json({ data: { result } }, { status: 200 })
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    )
  }
}
