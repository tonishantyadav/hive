import _ from 'lodash'
import { BotMessageSquare } from 'lucide-react'

export const ChatWelcomeMessage = ({
  channelName,
}: {
  channelName: string
}) => {
  return (
    <div className="ml-2 flex items-center gap-1">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900">
        <BotMessageSquare className="h-8 w-8" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-lg  font-semibold text-zinc-200 md:text-2xl lg:text-2xl">
          Welcome to {_.capitalize(channelName)}!
        </span>
        <span className="text-sm font-medium text-zinc-300/80">
          Time to spill the tea 😎
        </span>
      </div>
    </div>
  )
}
