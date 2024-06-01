'use client'

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
import { ChannelCreateFormData } from '@/schemas/channel'
import { ServerCreatedFormData } from '@/schemas/server'
import { UseFormReturn } from 'react-hook-form'

export const ChannelCreateForm = ({
  form,
}: {
  form: UseFormReturn<ChannelCreateFormData>
}) => {
  const onSubmit = async (data: ServerCreatedFormData) => {}

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
                  <FormLabel>Channel Name</FormLabel>
                  <Input placeholder="Your server name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FormLabel>Channel Name</FormLabel>
                  <Input placeholder="Your server name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className="mt-2"></DialogFooter>
        </div>
      </form>
    </Form>
  )
}

// <Button
//   className="flex w-full items-center bg-indigo-600 font-semibold hover:bg-indigo-700"
//   type="submit"
//   disabled={isUploading || server.isPending}
// >
//   {server.isPending ? (
//     <BeatLoader className="white" size={10} />
//   ) : (
//     'Create'
//   )}
// </Button>
