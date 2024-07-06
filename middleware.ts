import NextAuth from 'next-auth'
import authConfig from '@/auth.config'

const { auth: middleware } = NextAuth(authConfig)

export default middleware(async (req) => {
  const session = req.auth
  const href = req.nextUrl.href
  const pathname = req.nextUrl.pathname

  const publicRoute = publicRoutes.includes(pathname)

  if (!session && !publicRoute) {
    const newUrl = new URL('/', req.nextUrl.origin)
    return Response.redirect(newUrl)
  }

  if (session) return

  if (session && pathname === '/signin') {
    if (href.includes('/signin')) {
      const newUrl = new URL('/', req.nextUrl.origin)
      return Response.redirect(newUrl)
    }
    return Response.redirect(req.nextUrl.origin)
  }
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

const publicRoutes = [
  '/',
  '/signin',
  '/api/uploadthing',
  '/api/auth',
  '/api/servers',
]
