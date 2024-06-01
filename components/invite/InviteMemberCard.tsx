'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'
import { useInviteCodeVerify } from '@/hooks/invite/useInviteCodeVerify'
import { handleError } from '@/utils/error'
import { useRouter } from 'next/navigation'
import { BeatLoader } from 'react-spinners'

export const InviteMemberCard = ({ inviteCode }: { inviteCode: string }) => {
  const router = useRouter()
  const inviteCodeVerify = useInviteCodeVerify()

  const onClick = async () => {
    try {
      const response = await inviteCodeVerify.mutateAsync(inviteCode)
      router.push(`/servers/${response.data.serverId}`)
    } catch (error) {
      const errorMessage = handleError(error)
      toast({
        variant: 'destructive',
        title: 'Uh-oh! Something went wrong.',
        description: errorMessage,
      })
      setTimeout(() => router.push('/'), 1000)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hey there!</CardTitle>
        <CardDescription>
          You&apos;ve been invited to join the server! Click the button below to
          join now.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          className="text-md flex w-full items-center gap-1 font-semibold"
          onClick={onClick}
        >
          {inviteCodeVerify.isPending ? (
            <BeatLoader color="white" size={10} />
          ) : (
            <span>Join</span>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
