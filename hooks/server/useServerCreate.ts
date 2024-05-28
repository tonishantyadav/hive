import { toast } from '@/components/ui/use-toast'
import { ServerCreatedFormData } from '@/schemas/server'
import { handleError } from '@/utils/error'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useServerCreate = () => {
  return useMutation({
    mutationFn: async (data: ServerCreatedFormData) =>
      await axios.post('/api/servers', data),
    onSuccess: (response) => {
      toast({
        title: 'Uh huh! Your server is been created.',
        description: 'Let your friends know you have a new server.',
      })
    },
    onError: (error) => {
      const errorMessage = handleError(error)
      toast({
        title: 'Uh oh! Unable to create your server.',
        description: errorMessage,
        variant: 'destructive',
      })
    },
  })
}
