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
import { useRouter } from 'next/navigation'
import { UseFormReturn } from 'react-hook-form'
import { BeatLoader } from 'react-spinners'

interface Props {
  fileUrl: string | null
  isUploading: boolean
  form: UseFormReturn<ServerCreatedFormData>
}

export const ServerCreateForm = ({ fileUrl, isUploading, form }: Props) => {
  const router = useRouter()
  const server = useServerCreate()

  const onSubmit = async (data: ServerCreatedFormData) => {
    if (fileUrl && data) {
      await server.mutateAsync({
        name: data.name,
        imageUrl: fileUrl,
      })
      router.refresh()
    }
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
              className="flex w-full items-center bg-indigo-600 font-semibold hover:bg-indigo-700"
              type="submit"
              disabled={isUploading || server.isPending}
            >
              {server.isPending ? (
                <BeatLoader className="white" size={10} />
              ) : (
                'Create'
              )}
            </Button>
          </DialogFooter>
        </div>
      </form>
    </Form>
  )
}
