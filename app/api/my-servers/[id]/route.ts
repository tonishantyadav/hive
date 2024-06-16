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
      imageUrl: z.string(),
    })
    .safeParse(body)

  if (!validation.success || !params.id)
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })

  const { imageUrl } = validation.data

  const myServer = await prisma.myServer.findUnique({
    where: { id: params.id },
  })
  if (!myServer)
    return NextResponse.json({ error: 'My Server not found.' }, { status: 404 })

  try {
    await prisma.myServer.update({
      where: { id: myServer.id },
      data: { imageUrl },
    })
    return NextResponse.json({}, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    )
  }
}
