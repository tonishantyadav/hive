import { ReactNode } from 'react'
import { cn } from '../lib/utils'

const Container = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <div className={cn('mx-auto max-w-screen-xl px-2.5 md:px-20', className)}>
      {children}
    </div>
  )
}

export default Container
