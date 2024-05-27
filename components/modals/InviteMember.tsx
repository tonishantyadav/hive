import { UserPlus2Icon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { DropdownMenuItem } from '../ui/dropdown-menu'

export const InviteMember = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem className="group flex cursor-pointer  justify-between hover:!bg-indigo-600">
          <span>Invite People</span>
          <UserPlus2Icon className="h-4 w-4 text-indigo-400 group-hover:text-white" />
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
