'use client'

import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'

const HomePage = () => {
  return (
    <Button
      onClick={() =>
        toast({
          // variant: 'destructive'
          title: 'Uh huh! Your server is been created.',
          description: 'Let your friends know you have a new server.',
        })
      }
    >
      Click
    </Button>
  )
}

export default HomePage
