import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname, origin, search } = request.nextUrl
  const token = await getToken({ req: request })

  const protectedPaths = [
    '/anuncios',
    '/conta',
    '/favoritos',
    '/reservas',
    '/cadastrar-empresa'
  ]

  if (protectedPaths.some((p) => pathname.startsWith(p))) {
    if (!token) {
      const loginUrl = new URL('/login', origin)

      loginUrl.searchParams.set('callbackUrl', `${pathname}${search}`)

      return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/anuncios/:path*',
    '/conta/:path*',
    '/favoritos',
    '/reservas',
    '/cadastrar-empresa'
  ]
}
