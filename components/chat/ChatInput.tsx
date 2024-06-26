'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  PaperclipIcon,
  SendHorizonalIcon,
  SendIcon,
  SmileIcon,
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const ChatInputFormSchema = z.object({
  message: z.string().min(1, "Message can't be empty"),
})

export const ChatInput = () => {
  const form = useForm<z.infer<typeof ChatInputFormSchema>>({
    defaultValues: {
      message: '',
    },
  })

  const onSubmit = (data: ChatInputFormData) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center justify-between gap-2 p-3">
                  <div className="relative flex w-full items-center pb-1">
                    <Input
                      placeholder="What's in your mind?"
                      className="h-12 pl-12 pr-12"
                      {...field}
                    />
                    <div className="absolute left-2 flex items-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-indigo-600"
                      >
                        <PaperclipIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute right-2 flex items-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-indigo-600"
                      >
                        <SmileIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    className="mb-1 rounded-full bg-zinc-700 text-white hover:bg-zinc-800"
                    size="icon"
                    type="submit"
                    disabled={!form.getValues('message').length}
                  >
                    <SendHorizonalIcon className="h-4 w-4" />
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

type ChatInputFormData = z.infer<typeof ChatInputFormSchema>
