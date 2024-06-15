import prisma from '@/prisma/client'
import { User } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const serverId = searchParams.get('server')

  if (!serverId)
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })

  const server = await prisma.server.findUnique({
    where: { id: serverId },
  })

  if (!server)
    return NextResponse.json({ error: 'Server not found.' }, { status: 404 })

  try {
    const members = await prisma.member.findMany({
      where: { serverId },
    })
    const users = await Promise.all(
      members.map((member) =>
        prisma.user.findUnique({
          where: {
            id: member.userId,
          },
        })
      )
    )

    const filteredMembers = users.filter((user): user is User => user !== null)

    return NextResponse.json(filteredMembers)
  } catch (error) {
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    )
  }
}
