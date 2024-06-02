import prisma from '@/prisma/client'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!params.id)
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })

  const { userId: clerkUserId } = auth()
  if (!clerkUserId)
    return NextResponse.json({ error: 'Unauthorized user.' }, { status: 401 })

  const user = await prisma.user.findUnique({ where: { clerkUserId } })
  if (!user)
    return NextResponse.json({ error: 'Unauthorized user.' }, { status: 401 })

  const server = await prisma.server.findUnique({ where: { id: params.id } })
  if (!server)
    return NextResponse.json({ error: 'Server not found.' }, { status: 404 })

  if (user.userRole !== 'ADMIN')
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
