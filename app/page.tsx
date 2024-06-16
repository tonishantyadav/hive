import Container from '@/components/Container'
import { Button } from '@/components/ui/button'
import highVoltageIcon from '@/public/high-voltage-icon.svg'
import { SignInButton } from '@clerk/nextjs'
import { ArrowRightIcon } from 'lucide-react'
import Image from 'next/image'

const HomePage = () => {
  return (
    <div className="relative h-full w-full bg-background">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_80%_at_50%_10%,#000_70%,transparent_100%)]">
        <Container className="flex h-full w-full flex-col items-center justify-center space-y-1">
          <div className="flex flex-col items-center justify-center space-y-5 py-2 text-center">
            <HeaderSection />
          </div>{' '}
        </Container>
      </div>
    </div>
  )
}

const HeaderSection = () => {
  return (
    <>
      <p className="flex items-center rounded-full border-2 border-neutral-100 bg-background px-7 py-2 text-xs font-medium text-white shadow-lg transition-all md:text-lg lg:text-lg">
        Hive is now public{' '}
        <span className="px-1">
          <Image
            src={highVoltageIcon}
            alt="High voltage icon"
            className="h-[10px] w-[10px] md:h-[18px] md:w-[18px] lg:h-[18px] lg:w-[18px]"
          />
        </span>
      </p>
      <h1 className="max-w-4xl text-3xl font-bold md:text-6xl lg:text-7xl">
        Connect with Friends Instantly and Effortlessly{' '}
      </h1>
      <p className="max-w-prose text-center text-xs text-neutral-300 md:text-lg lg:text-lg">
        Experience fast and easy communication with Hive. Connect with friends
        instantly in a clean, user-friendly environment.
      </p>
      <div>
        <SignInButton>
          <Button
            className="flex space-x-1 rounded-full shadow-lg transition hover:scale-110"
            size="lg"
          >
            <span className="text-md font-bold md:text-lg lg:text-lg">
              Get Started
            </span>
            <ArrowRightIcon className="h-4 w-4 md:h-5 md:w-5 lg:h-5 lg:w-5" />
          </Button>
        </SignInButton>
      </div>
    </>
  )
}

export default HomePage
