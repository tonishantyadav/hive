'use client'

import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { LoaderIcon, LogOutIcon } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useState } from 'react'

export const SignoutButton = () => {
  const [isPending, setIsPending] = useState(false)

  const onClick = () => {
    try {
      setIsPending(true)
      signOut()
    } catch (error) {
      setIsPending(false)
      toast({
        variant: 'destructive',
        title: 'Something Went Wrong',
        description: 'Unable to signout! Please try again later.',
      })
    }
  }

  return (
    <Button
      className="rounded-full hover:bg-rose-600"
      size="icon"
      disabled={isPending}
      onClick={onClick}
      variant="ghost"
    >
      {isPending ? (
        <LoaderIcon className="h-4 w-4 animate-spin" />
      ) : (
        <LogOutIcon className="h-4 w-4" />
      )}
    </Button>
  )
}
