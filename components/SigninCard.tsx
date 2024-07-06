import { SigninButton } from '@/components/SigninButton'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export const SigninCard = () => {
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl lg:text-2xl">
          Signin to Hive
        </CardTitle>
        <CardDescription>
          Welcome back! Please sign in to continue.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <SigninButton />
      </CardContent>
    </Card>
  )
}
