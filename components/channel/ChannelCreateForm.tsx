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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { useChannelCreate } from '@/hooks/channel'
import { ChannelCreateFormData } from '@/schemas/channel'
import { handleError } from '@/utils/error'
import { ChannelCategory } from '@prisma/client'
import { UseFormReturn } from 'react-hook-form'
import { BeatLoader } from 'react-spinners'

export const ChannelCreateForm = ({
  serverId,
  form,
}: {
  serverId: string
  form: UseFormReturn<ChannelCreateFormData>
}) => {
  const channelCreate = useChannelCreate()

  const onSubmit = async (data: ChannelCreateFormData) => {
    try {
      await channelCreate.mutateAsync({
        serverId,
        channelName: data.channelName,
        channelCategory: data.channelCategory,
      })
    } catch (error) {
      const errorMessage = handleError(error)
      toast({
        variant: 'destructive',
        title: 'Uh-oh! Something went wrong.',
        description: errorMessage,
      })
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
          <FormField
            control={form.control}
            name="channelCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select channel category" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(ChannelCategory).map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className="mt-2">
            <Button
              className="flex w-full items-center font-semibold"
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
