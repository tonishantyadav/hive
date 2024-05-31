import { User, UserRole } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

type MemberRoleUpdate = {
  serverId: string
  memberId: string
  memberRole: UserRole
}

export const useMemberRoleUpdate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: MemberRoleUpdate) => {
      await axios.patch(`/api/members/${data.memberId}`, {
        memberRole: data.memberRole,
      })
    },
    onMutate: async (data: MemberRoleUpdate) => {
      const members = queryClient.getQueryData<User[]>([
        data.serverId,
        'members',
      ])
      queryClient.setQueryData(['members', data.serverId], (members: User[]) =>
        members.map((member: User) =>
          member.id === data.memberId
            ? { ...member, userRole: data.memberRole }
            : member
        )
      )
      return { members }
    },
    onError: (_, data: MemberRoleUpdate, context) => {
      queryClient.setQueryData(
        [data.serverId, 'members'],
        context?.members || []
      )
    },
    onSettled: (_, __, data: MemberRoleUpdate) => {
      queryClient.invalidateQueries({ queryKey: ['members', data.serverId] })
    },
  })
}
