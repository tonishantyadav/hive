import { toast } from '@/components/ui/use-toast'
import { MessageUpdateOrDeleteData } from '@/schemas/message'
import { handleError } from '@/utils/error'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useMessageDelete = () => {
  return useMutation({
    mutationFn: async (data: MessageUpdateOrDeleteData) =>
      axios.delete(`/api/socket/messages/${data.messageId}`, {
        data: { ...data },
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
