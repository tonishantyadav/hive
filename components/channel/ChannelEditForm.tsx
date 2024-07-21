'use client'

import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { useChannelEdit } from '@/hooks/channel'
import { ChannelEditSchema } from '@/schemas/channel'
import { useModalStore } from '@/stores/modal'
import { handleError } from '@/utils/error'
import { Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

export const ChannelEditForm = ({
  serverId,
  channelId,
  form,
}: {
  serverId: string
  channelId: string
  form: UseFormReturn<z.infer<typeof ChannelEditSchema>>
}) => {
  const router = useRouter()
  const channelEdit = useChannelEdit()
  const { onClose } = useModalStore()

  const onSubmit = async (data: z.infer<typeof ChannelEditSchema>) => {
    try {
      await channelEdit.mutateAsync({
        serverId,
        channelId,
        channelName: data.channelName,
      })
      router.refresh()
      onClose('EDIT_CHANNEL')
    } catch (error) {
      const errorMessage = handleError(error)
      toast({
        variant: 'destructive',
        title: 'Uh-oh! Something went wrong.',
        description: errorMessage,
      })
      onClose('EDIT_CHANNEL')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2.5">
          <FormField
            control={form.control}
            name="channelName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className="mt-2">
            <Button
              className="text-md flex w-full items-center font-semibold"
              type="submit"
              disabled={channelEdit.isPending}
            >
              {channelEdit.isPending ? (
                <Loader2Icon className="h-4 w-4 animate-spin" />
              ) : (
                'Update'
              )}
            </Button>
          </DialogFooter>
        </div>
      </form>
    </Form>
  )
}
