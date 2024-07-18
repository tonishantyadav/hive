'use client'

import { memberRoleIconMap } from '@/components/channel/ChannelFooter'
import { MessageWithMember } from '@/components/chat/ChatContent'
import { cn } from '@/lib/utils'
import { FileIcon, ImageIcon, PencilIcon, TrashIcon } from 'lucide-react'
import { useState } from 'react'

export const ChatMessage = ({
  userId,
  message,
}: {
  userId: string
  message: MessageWithMember
}) => {
  const isPdf = message.fileUrl && message.fileUrl.includes('pdf')
  const isYou = message.member.userId === userId
  const isAdminOrModerator =
    message.member.memberRole === 'ADMIN' ||
    message.member.memberRole === 'MODERATOR'

  const [isEdited, setIsEdited] = useState<boolean>(false)
  const [isDeleted, setIsDeleted] = useState<boolean>(false)

  return (
    <div className="group mx-2.5 my-2 flex h-fit w-fit max-w-lg flex-col gap-2 rounded-lg bg-zinc-900 p-2">
      <div className="flex items-center justify-between">
        <div className="flex h-fit w-fit items-center gap-1 rounded-full bg-black/30 px-3 py-1">
          {memberRoleIconMap[message.member.memberRole]}
          <span className="text-sm font-medium text-zinc-300">
            {isYou ? 'You ' : message.member.user.name}
          </span>
        </div>
        {isEdited && !isDeleted && (
          <div className="flex px-2 text-xs font-medium  text-zinc-400 group-hover:hidden">
            edited
          </div>
        )}
        {!isDeleted && (
          <div className="hidden gap-1 pl-5 group-hover:flex">
            {isYou && (
              <PencilIcon
                className="h-4 w-4 text-zinc-400 hover:text-zinc-500"
                onClick={() => {
                  setIsEdited(true)
                }}
              />
            )}
            {(isYou || isAdminOrModerator) && (
              <TrashIcon
                className="h-4 w-4 text-zinc-400 hover:text-zinc-500"
                onClick={() => {
                  setIsDeleted(true)
                }}
              />
            )}
          </div>
        )}
      </div>
      {message.fileUrl && (
        <>
          {isPdf ? (
            <FileIcon className="h-10 w-10 fill-rose-400 stroke-rose-600" />
          ) : (
            <ImageIcon className="h-10 w-10 fill-rose-400 stroke-rose-600" />
          )}
        </>
      )}
      <p
        className={cn(
          'break-words px-2 text-sm',
          isDeleted ? 'italic text-zinc-400' : ''
        )}
      >
        {isDeleted ? 'This message has been deleted' : message.message}
      </p>
    </div>
  )
}
