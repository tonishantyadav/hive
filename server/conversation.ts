import prisma from '@/prisma/client'

export async function getConversation(senderId: string, receiverId: string) {
  const conversation = await prisma.conversation.findUnique({
    where: { senderId, receiverId },
  })
  return conversation
}
