import { Toaster } from '@/components/ui/toaster'
import { ModalProvider, QueryClientProvider, ThemeProvider } from '@/providers'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hive',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClerkProvider
          appearance={{
            baseTheme: dark,
          }}
        >
          <QueryClientProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              disableTransitionOnChange
            >
              <ModalProvider />
              <main className="h-screen">
                {children}
                <Toaster />
              </main>
            </ThemeProvider>
          </QueryClientProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
