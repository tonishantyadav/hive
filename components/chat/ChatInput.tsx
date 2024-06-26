import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PaperclipIcon, SendIcon, SmileIcon } from 'lucide-react'

export const ChatInput = () => {
  return (
    <div className="flex items-center justify-between gap-2 p-3">
      <div className="relative flex w-full items-center pb-1">
        <Input
          placeholder="What's in your mind?"
          className="h-12 pl-12 pr-12"
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
        size="icon"
        className="mb-1 rounded-full bg-indigo-500 text-white hover:bg-indigo-600"
      >
        <SendIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}
