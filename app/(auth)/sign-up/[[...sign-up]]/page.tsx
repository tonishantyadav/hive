import { SignUp } from '@clerk/nextjs'

export default function SignupPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <SignUp />
    </div>
  )
}
