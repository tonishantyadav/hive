import { memberRoleIconMap } from '@/components/channel/ChannelFooter'
import { MessageWithMember } from '@/components/chat/ChatContent'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { PencilIcon, TrashIcon } from 'lucide-react'

export const ChatMessage = ({ message }: { message: MessageWithMember }) => {
  console.log(message)

  if (!message) return null

  return (
    <div className="group flex h-fit w-fit flex-col gap-2  rounded-lg bg-zinc-900 p-2">
      <div className="flex items-center justify-between">
        <div className="flex h-fit w-fit items-center gap-1 rounded-full bg-black/30 px-3 py-1">
          {memberRoleIconMap[message.member.memberRole]}
          <span className="text-sm font-medium text-zinc-300">
            {message.member.user.name}
          </span>
        </div>
        <div className="hidden gap-1 pl-5 group-hover:flex">
          <PencilIcon className="h-4 w-4 text-indigo-500 hover:text-indigo-600" />
          <TrashIcon className="h-4 w-4 text-rose-500 hover:text-rose-600" />
        </div>
      </div>
      <p className="px-2 text-sm">{message.message}</p>
    </div>
  )
}
