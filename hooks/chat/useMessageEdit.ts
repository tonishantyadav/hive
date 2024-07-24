import { toast } from '@/components/ui/use-toast'
import { MessageUpdateOrDeleteData } from '@/schemas/message'
import { handleError } from '@/utils/error'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export const useMessageEdit = () => {
  return useMutation({
    mutationFn: async (data: MessageUpdateOrDeleteData) =>
      await axios.patch(`/api/socket/messages/${data.messageId}`, { ...data }),
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
