import { toast } from '@/components/ui/use-toast'
import { handleError } from '@/utils/error'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export const useConversationCreate = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: async ({
      serverId,
      senderId,
      receiverId,
    }: {
      serverId: string
      senderId: string
      receiverId: string
    }) => {
      const response = await axios.post('/api/conversations', {
        senderId,
        receiverId,
      })
      return response.data
    },
    onSuccess: (data, variables) =>
      router.push(
        `/servers/${variables.serverId}/conversations/${data.conversationId}`
      ),
    onError: (error) => {
      const errorMessage = handleError(error)
      toast({
        variant: 'destructive',
        title: 'Uh-Oh! Something Went Wrong.',
        description: errorMessage,
      })
    },
  })
}
