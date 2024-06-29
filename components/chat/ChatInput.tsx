'use client'

import { EmojiPicker, MessageAttachementPreview } from '@/components/message'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { useMessageCreate } from '@/hooks/chat'
import { useModalStore } from '@/stores/modal'
import { handleError } from '@/utils/error'
import { Loader2Icon, PaperclipIcon, SendHorizonalIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const ChatInputFormSchema = z.object({
  message: z.string().optional(),
})

export const ChatInput = ({
  serverId,
  channelId,
}: {
  serverId: string
  channelId: string
}) => {
  const form = useForm<z.infer<typeof ChatInputFormSchema>>({
    defaultValues: {
      message: '',
    },
  })
  const router = useRouter()
  const messageCreate = useMessageCreate()
  const { onOpen, attachement, setAttachement } = useModalStore()
  const [disabled, setDisabled] = useState(true)

  const onSubmit = async (data: ChatInputFormData) => {
    try {
      await messageCreate.mutateAsync({
        serverId,
        channelId,
        message: data.message,
        fileUrl: attachement?.url,
      })
      form.reset()
      setAttachement(null)
      router.refresh()
    } catch (error) {
      const errorMessage = handleError(error)
      toast({
        variant: 'destructive',
        title: 'Uh-Oh! Something went wrong.',
        description: errorMessage,
      })
    }
  }

  useEffect(() => {
    // Watch both the message input and the attachment URL
    const subscription = form.watch((value) => {
      value.message && value.message.length > 0
        ? setDisabled(false)
        : attachement && attachement.url
          ? setDisabled(false)
          : setDisabled(true)
    })
    // Clean up the subscription on unmount
    return () => subscription.unsubscribe()
  }, [form, attachement])

  useEffect(() => {
    attachement && attachement.url ? setDisabled(false) : setDisabled(true)
  }, [attachement])

  return (
    <div className="flex flex-col">
      {attachement && <MessageAttachementPreview attachement={attachement} />}
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
                          onClick={(e) => {
                            e.preventDefault()
                            onOpen('MESSAGE_ATTACHEMENT')
                          }}
                        >
                          <PaperclipIcon className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="absolute right-2 flex items-center">
                        <EmojiPicker
                          onChange={(emoji: string) =>
                            field.onChange(`${field.value} ${emoji}`)
                          }
                        />
                      </div>
                    </div>
                    <Button
                      className="mb-1 rounded-full bg-zinc-800 text-white hover:bg-zinc-800/80"
                      size="icon"
                      type="submit"
                      disabled={disabled}
                    >
                      {messageCreate.isPending ? (
                        <Loader2Icon className="h-4 w-4 animate-spin" />
                      ) : (
                        <SendHorizonalIcon className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}

type ChatInputFormData = z.infer<typeof ChatInputFormSchema>
