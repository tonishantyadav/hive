'use client'

import { memberRoleIconRecord } from '@/components/channel/ChannelFooter'
import { MessageWithMember } from '@/components/chat/ChatContent'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  useMessageDelete,
  useMessageEdit,
  useSocketMessageUpdateDelete,
} from '@/hooks/chat'
import { useConversationCreate } from '@/hooks/conversation'
import { useConversations } from '@/hooks/conversation/useConversations'
import { cn } from '@/lib/utils'
import { MessageEditSchema } from '@/schemas/message'
import { formatTimeStamp } from '@/utils/format-timestamp'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  FileTextIcon,
  ImageIcon,
  Loader2Icon,
  PencilIcon,
  TrashIcon,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const ChatMessage = ({
  userId,
  memberId,
  serverId,
  channelId,
  message,
}: {
  userId: string
  memberId: string
  serverId: string
  channelId: string
  message: MessageWithMember
}) => {
  const form = useForm<z.infer<typeof MessageEditSchema>>({
    resolver: zodResolver(MessageEditSchema),
    defaultValues: {
      message: message.message || undefined,
    },
  })
  const isPdf = message.fileUrl && message.fileUrl.includes('pdf')
  const owner = message.member.userId === userId
  const adminOrModerator =
    message.member.memberRole === 'ADMIN' ||
    message.member.memberRole === 'MODERATOR'
  const router = useRouter()
  const messageEdit = useMessageEdit()
  const messageDelete = useMessageDelete()
  const conversationCreate = useConversationCreate()

  const { data: conversations, isPending, isError } = useConversations(userId)

  const [isRedirecting, setIsRedirecting] = useState(false)

  const onEdit = async (data: z.infer<typeof MessageEditSchema>) => {
    if (data.message)
      await messageEdit.mutateAsync({
        userId,
        serverId,
        channelId,
        messageId: message.id,
        messageContent: data.message,
      })
  }

  const onDelete = async () => {
    await messageDelete.mutateAsync({
      userId,
      serverId,
      channelId,
      messageId: message.id,
    })
  }

  const onMemberClick = async () => {
    if (conversations && conversations.length && !isPending && !isError) {
      setIsRedirecting(true)
      const conversation = conversations.find(
        (c) => c.senderId === memberId && c.receiverId === message.memberId
      )
      if (conversation) {
        router.push(`/servers/${serverId}/conversations/${conversation.id}`)
        setIsRedirecting(false)
      }
    } else {
      await conversationCreate.mutateAsync({
        serverId,
        senderId: memberId,
        receiverId: message.memberId,
      })
    }
  }

  useSocketMessageUpdateDelete(channelId, message.id)

  return (
    <div className="group mx-2.5 my-2 flex h-fit w-fit max-w-xs flex-col gap-2 rounded-lg bg-zinc-900 p-2 md:max-w-sm lg:max-w-lg">
      <div className="flex items-center justify-between">
        <div
          className={cn(
            'flex h-fit w-fit items-center gap-1 rounded-full bg-black/30 px-3 py-1',
            !owner ? 'cursor-pointer ' : ''
          )}
          onClick={!owner ? onMemberClick : undefined}
        >
          {isRedirecting || conversationCreate.isPending ? (
            <Loader2Icon className="h-4 w-4 animate-spin" />
          ) : (
            memberRoleIconRecord[message.member.memberRole]
          )}
          <span
            className={cn(
              'text-sm font-medium text-zinc-300',
              !owner ? 'hover:text-zinc-100' : ''
            )}
          >
            {owner ? 'You ' : message.member.user.name}
          </span>
        </div>
        <div className="flex items-center gap-1 pl-5">
          <span
            className={cn(
              'text-[0.60rem] text-zinc-300',
              !message.isDeleted ? 'group-hover:hidden' : ''
            )}
          >
            {formatTimeStamp(
              message.isEdited ? message.updatedAt : message.createdAt
            )}
          </span>
          {message.isEdited && !message.isDeleted && (
            <div className="flex text-xs font-medium text-zinc-400 group-hover:hidden">
              (edited)
            </div>
          )}
        </div>
        {!message.isDeleted && (
          <div className="hidden gap-1 pl-5 group-hover:flex">
            {owner && (
              <Dialog>
                <DialogTrigger asChild>
                  <PencilIcon className="h-4 w-4 text-zinc-400 hover:text-zinc-500" />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      <span>Edit Your Message</span>
                    </DialogTitle>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onEdit)}>
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                            <DialogFooter>
                              <Button>
                                {messageEdit.isPending ? (
                                  <Loader2Icon className="h-4 w-4 animate-spin" />
                                ) : (
                                  <span>Submit</span>
                                )}
                              </Button>
                            </DialogFooter>
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            )}
            {(owner || adminOrModerator) &&
              (messageDelete.isPending ? (
                <Loader2Icon className="h-4 w-4 animate-spin" />
              ) : (
                <TrashIcon
                  className="h-4 w-4 text-zinc-400 hover:text-zinc-500"
                  onClick={onDelete}
                />
              ))}
          </div>
        )}
      </div>
      {message.fileUrl && (
        <>
          {isPdf ? (
            <Link
              href={message.fileUrl}
              target="_blank"
              className="w-fit cursor-pointer"
            >
              <FileTextIcon className="h-10 w-10 fill-rose-400 stroke-rose-600 hover:stroke-rose-700" />
            </Link>
          ) : (
            <Link
              href={message.fileUrl}
              target="_blank"
              className="w-fit cursor-pointer"
            >
              <ImageIcon className="h-10 w-10 fill-rose-400 stroke-rose-600 hover:stroke-rose-700" />
            </Link>
          )}
        </>
      )}
      <p
        className={cn(
          'break-words px-2 text-xs',
          message.isDeleted ? 'italic text-zinc-400' : ''
        )}
      >
        {message.isDeleted ? 'This message has been deleted' : message.message}
      </p>
    </div>
  )
}
