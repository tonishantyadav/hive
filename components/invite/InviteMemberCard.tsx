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
    <Card className="border-none bg-zinc-800">
      <CardHeader>
        <CardTitle>Hey there!</CardTitle>
        <CardDescription className="text-zinc-200/75">
          You&apos;ve been invited to join the server! Click the button below to
          join now.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          className="flex w-full items-center gap-1 bg-indigo-600 hover:bg-indigo-700"
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
