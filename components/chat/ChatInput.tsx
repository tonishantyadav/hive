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
import { useSocketMessageCreate } from '@/hooks/chat/useSocketMessageCreate'
import { useModalStore } from '@/stores/modal'
import { useScrollStore } from '@/stores/scroll'
import { handleError } from '@/utils/error'
import { Loader2Icon, PaperclipIcon, SendHorizonalIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const ChatInputSchema = z.object({
  message: z.string().optional(),
})

export const ChatInput = ({
  userId,
  serverId,
  channelId,
}: {
  userId: string
  serverId: string
  channelId: string
}) => {
  const form = useForm<z.infer<typeof ChatInputSchema>>({
    defaultValues: {
      message: '',
    },
  })
  const messageCreate = useMessageCreate()
  const { count, containerRef, isScrolling, setIsScrolling } = useScrollStore()
  const { onOpen, attachement, setAttachement } = useModalStore()
  const [disabled, setDisabled] = useState<boolean>(true)
  const [scrollToBottom, setScrollToBottom] = useState<boolean>(false)

  const onSubmit = async (data: ChatInputData) => {
    try {
      await messageCreate.mutateAsync({
        userId,
        serverId,
        channelId,
        message: data.message,
        fileUrl: attachement?.url,
      })
      form.reset()
      setIsScrolling(false)
      setScrollToBottom(true)
      setAttachement(null)
    } catch (error) {
      const errorMessage = handleError(error)
      toast({
        variant: 'destructive',
        title: 'Uh-Oh! Something went wrong.',
        description: errorMessage,
      })
    }
  }

  useSocketMessageCreate(channelId)

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
    attachement && attachement.url
      ? setDisabled(false)
      : form.getValues('message')
        ? setDisabled(false)
        : setDisabled(true)
  }, [form, attachement])

  useEffect(() => {
    if (
      scrollToBottom &&
      containerRef &&
      containerRef.current &&
      !isScrolling
    ) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [scrollToBottom, containerRef, count, isScrolling, setIsScrolling])

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
                          className="h-8 w-8 rounded-full"
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

type ChatInputData = z.infer<typeof ChatInputSchema>
