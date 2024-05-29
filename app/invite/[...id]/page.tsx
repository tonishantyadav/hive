import { Card, CardHeader, CardTitle } from '@/components/ui/card'

const InviteMemberPage = ({ params }: { params: { id: string } }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello there 👋 </CardTitle>
      </CardHeader>
    </Card>
  )
}

export default InviteMemberPage
