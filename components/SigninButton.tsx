'use client'

import { Button } from '@/components/ui/button'
import { Loader2Icon } from 'lucide-react'
import { signIn, useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import { toast } from './ui/use-toast'

export const SigninButton = () => {
  const searchParams = useSearchParams()

  const [pending, setPending] = useState<boolean>(false)
  const [provider, setProvider] = useState<'google' | 'github' | null>(null)
  const { data: session, status } = useSession()

  useEffect(() => {
    if (session && session.user && status === 'authenticated') setPending(true)
    if (searchParams && searchParams.get('error')) {
      toast({
        variant: 'destructive',
        title: 'Uh-Oh! Something went wrong.',
        description:
          'Unable to Signin! Your email is already connected with another provider.',
      })
    }
  }, [session, status, searchParams])

  return (
    <div className="flex flex-col gap-3">
      <Button
        className="w-full font-semibold"
        disabled={pending}
        onClick={() => {
          setPending(true)
          setProvider('google')
          signIn('google')
        }}
      >
        {pending && provider === 'google' ? (
          <Loader2Icon className="h-4 w-4 animate-spin" />
        ) : (
          <div className="flex items-center gap-1">
            <FaGoogle className="h-4 w-4" />
            <span>Google</span>
          </div>
        )}
      </Button>
      <Button
        className="w-full font-semibold"
        disabled={pending}
        onClick={() => {
          setPending(true)
          setProvider('github')
          signIn('github')
        }}
      >
        {pending && provider === 'github' ? (
          <Loader2Icon className="h-4 w-4 animate-spin" />
        ) : (
          <div className="flex items-center gap-1">
            <FaGithub className="h-4 w-4" />
            <span>GitHub</span>
          </div>
        )}
      </Button>
    </div>
  )
}
