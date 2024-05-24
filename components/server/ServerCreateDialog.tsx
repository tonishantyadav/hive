import { Dropzone } from '@/components/dropzone'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '../ui/input'

export const ServerCreateDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>Trigger</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Create your server</DialogTitle>
          <DialogDescription>
            Give your server a personality with name and icon. You can always
            change it later.
          </DialogDescription>
        </DialogHeader>
        <Dropzone />
        <Input placeholder="Server name" />
      </DialogContent>
    </Dialog>
  )
}
