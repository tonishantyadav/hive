import { InviteMemberCard } from '@/components/invite'
import { notFound } from 'next/navigation'

const InviteMemberPage = async ({ params }: { params: { id: string } }) => {
  if (!params.id) notFound()

  return (
    <div className="flex h-screen items-center justify-center">
      <InviteMemberCard inviteCode={params.id} />
    </div>
  )
}

export default InviteMemberPage
