'use client'

import { ChannelUpdateSchema } from '@/components/channel/ChannelUpdateModal'
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
import { useChannelUpdate } from '@/hooks/channel'
import { useModalStore } from '@/stores/modal'
import { handleError } from '@/utils/error'
import { useRouter } from 'next/navigation'
import { UseFormReturn } from 'react-hook-form'
import { BeatLoader } from 'react-spinners'
import { z } from 'zod'

export const ChannelUpdateForm = ({
  serverId,
  channelId,
  form,
}: {
  serverId: string
  channelId: string
  form: UseFormReturn<z.infer<typeof ChannelUpdateSchema>>
}) => {
  const router = useRouter()
  const channelUpdate = useChannelUpdate()
  const { onClose } = useModalStore()

  const onSubmit = async (data: z.infer<typeof ChannelUpdateSchema>) => {
    try {
      await channelUpdate.mutateAsync({
        serverId,
        channelId,
        channelName: data.channelName,
      })
      router.refresh()
      onClose('UPDATE_CHANNEL')
    } catch (error) {
      const errorMessage = handleError(error)
      toast({
        variant: 'destructive',
        title: 'Uh-oh! Something went wrong.',
        description: errorMessage,
      })
      onClose('UPDATE_CHANNEL')
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
              disabled={channelUpdate.isPending}
            >
              {channelUpdate.isPending ? (
                <BeatLoader className="white" size={10} />
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
