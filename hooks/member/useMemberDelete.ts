import { User } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

type MemberDelete = {
  serverId: string
  memberId: string
}

export const useMemberDelete = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: MemberDelete) =>
      await axios.delete(`/api/members/${data.memberId}`, {
        data: {
          serverId: data.serverId,
        },
      }),
    onMutate: (data: MemberDelete) => {
      const members = queryClient.getQueryData<User[]>([
        'members',
        data.serverId,
      ])
      queryClient.setQueryData(['members', data.serverId], (members: User[]) =>
        members.filter((member) => member.id !== data.memberId)
      )
      return { members }
    },
    onError: (_, data: MemberDelete, context) => {
      queryClient.setQueryData(
        ['members', data.serverId],
        context?.members || []
      )
    },
    onSettled: (_, __, data: MemberDelete) => {
      queryClient.invalidateQueries({ queryKey: ['members', data.serverId] })
    },
  })
}
