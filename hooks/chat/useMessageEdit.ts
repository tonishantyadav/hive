import { toast } from '@/components/ui/use-toast'
import { MessageEditData } from '@/schemas/message'
import { handleError } from '@/utils/error'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useMessageEdit = () => {
  return useMutation({
    mutationFn: async ({ messageId, messageContent }: MessageEditData) =>
      await axios.patch(`/api/messages/${messageId}`, {
        messageContent,
      }),
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
