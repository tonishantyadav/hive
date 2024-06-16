import { SignIn } from '@clerk/nextjs'

export default function SigninPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <SignIn />
    </div>
  )
}
