import { toast } from '@/components/ui/use-toast'
import { useModalStore } from '@/stores/modal'
import { handleError } from '@/utils/error'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useGenerateInviteLink = () => {
  const { onClose } = useModalStore()
  return useMutation({
    mutationFn: async (serverId: string) =>
      await axios.post('/api/invites', { serverId }),
    onError: (error) => {
      const errorMessage = handleError(error)
      toast({
        variant: 'destructive',
        title: 'Uh-oh! Something went wrong.',
        description: errorMessage,
      })
      setTimeout(() => onClose('INVITE_MEMBER'), 1000)
    },
  })
}
