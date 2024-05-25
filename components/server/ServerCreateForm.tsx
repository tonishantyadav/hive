'use client'

import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useServerCreate } from '@/hooks/server/useServerCreate'
import { ServerCreatedFormData } from '@/schemas/server'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { SetStateAction } from 'react'
import { UseFormReturn } from 'react-hook-form'

interface Props {
  fileUrl: string | null
  isUploading: boolean
  form: UseFormReturn<ServerCreatedFormData>
  setIsOpen: (isOpen: SetStateAction<boolean>) => void
  setIsSubmit: (isSubmit: SetStateAction<boolean>) => void
}

export const ServerCreateForm = ({
  fileUrl,
  isUploading,
  form,
  setIsOpen,
  setIsSubmit,
}: Props) => {
  const router = useRouter()
  const server = useServerCreate()

  const onSubmit = async (data: ServerCreatedFormData) => {
    if (fileUrl && data) {
      await server.mutateAsync({
        name: data.name,
        imageUrl: fileUrl,
      })
      router.refresh()
      setIsOpen(false)
    }
    setIsSubmit(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2.5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Your server name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className="mt-2">
            <Button
              className="flex items-center"
              type="submit"
              disabled={isUploading || server.isPending}
              onClick={() => setIsSubmit(true)}
            >
              {server.isPending ? (
                <div className="flex items-center gap-1">
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  <span>Creating your server</span>
                </div>
              ) : (
                'Submit'
              )}
            </Button>
          </DialogFooter>
        </div>
      </form>
    </Form>
  )
}
