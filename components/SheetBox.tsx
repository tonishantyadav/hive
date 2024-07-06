import { ChannelBox } from '@/components/channel'
import { ServerBox } from '@/components/server'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { MemberRole, Server, User } from '@prisma/client'
import { Menu } from 'lucide-react'

export const SheetBox = ({
  user,
  server,
  memberRole,
}: {
  user: User
  server: Server
  memberRole: MemberRole
}) => {
  return (
    <div className="md:hidden lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex h-full w-fit p-0" side="right">
          <div className="flex h-full flex-col gap-4 border py-2">
            <ServerBox />
          </div>
          <div className="flex w-full flex-col gap-2 p-1">
            <ChannelBox user={user} server={server} memberRole={memberRole} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
