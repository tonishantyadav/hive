'use client'

import { TextChannelCreateSchema } from '@/components/channel/ChannelTextCreateModal'
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
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { useChannelCreate } from '@/hooks/channel'
import { useModalStore } from '@/stores/modal'
import { handleError } from '@/utils/error'
import { ChannelCategory } from '@prisma/client'
import _ from 'lodash'
import { useRouter } from 'next/navigation'
import { UseFormReturn } from 'react-hook-form'
import { BeatLoader } from 'react-spinners'
import { z } from 'zod'

export const ChannelTextCreateForm = ({
  serverId,
  form,
}: {
  serverId: string
  form: UseFormReturn<z.infer<typeof TextChannelCreateSchema>>
}) => {
  const router = useRouter()
  const channelCreate = useChannelCreate()
  const { onClose } = useModalStore()

  const onSubmit = async (data: z.infer<typeof TextChannelCreateSchema>) => {
    try {
      await channelCreate.mutateAsync({
        serverId,
        channelName: data.channelName,
        channelCategory: ChannelCategory.TEXT,
      })
      router.refresh()
      onClose('CREATE_TEXT_CHANNEL')
    } catch (error) {
      const errorMessage = handleError(error)
      toast({
        variant: 'destructive',
        title: 'Uh-oh! Something went wrong.',
        description: errorMessage,
      })
      onClose('CREATE_TEXT_CHANNEL')
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
                  <Input placeholder="Enter channel name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-2 flex flex-col space-y-3">
            <Label className="text-zinc-200/80">Category</Label>
            <Input value={_.capitalize(ChannelCategory.TEXT)} disabled={true} />
          </div>
          <DialogFooter className="mt-2">
            <Button
              className="text-md flex w-full items-center font-semibold"
              type="submit"
              disabled={channelCreate.isPending}
            >
              {channelCreate.isPending ? (
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
