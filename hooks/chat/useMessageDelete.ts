import { toast } from '@/components/ui/use-toast'
import { handleError } from '@/utils/error'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useMessageDelete = () => {
  return useMutation({
    mutationFn: async (messageId: string) =>
      axios.delete(`/api/messages/${messageId}`),
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
