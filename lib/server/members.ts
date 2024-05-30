'use server'

import prisma from '@/prisma/client'
import { ServerMember, User } from '@prisma/client'

export default async function getMembers(
  serverId: string
): Promise<User[] | null> {
  try {
    const serverMembers = await prisma.serverMember.findMany({
      where: {
        serverId,
      },
    })
    const members = await Promise.all(
      serverMembers.map((serverMember) =>
        prisma.user.findUnique({
          where: {
            id: serverMember.userId,
          },
        })
      )
    )
    const filteredMembers = members.filter(
      (member): member is User => member !== null
    )
    return filteredMembers
  } catch (error) {
    console.log('Error occurred white fetching the members: ', error)
    return null
  }
}
