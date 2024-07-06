import { auth } from '@/auth'
import { SigninCard } from '@/components/SigninCard'
import { getDefaultServer } from '@/server/default-server'
import { redirect } from 'next/navigation'

const SigninPage = async () => {
  const session = await auth()

  if (session && session.user) {
    const server = await getDefaultServer(session.user.email!)
    if (server)
      redirect(`/servers/${server?.serverId}/channels/${server.channelId}`)
  }

  return (
    <div className="flex h-full items-center justify-center">
      <SigninCard />
    </div>
  )
}

export default SigninPage
