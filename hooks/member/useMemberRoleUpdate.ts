import { UserRole } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useMemberRoleUpdate = () => {
  return useMutation({
    mutationFn: async (data: { memberId: string; memberRole: UserRole }) => {
      await axios.patch(`/api/members/${data.memberId}`, {
        memberRole: data.memberRole,
      })
    },
  })
}
