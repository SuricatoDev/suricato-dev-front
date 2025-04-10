import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const { pathname, origin, search } = request.nextUrl
  const token = await getToken({ req: request })

  const protectedPaths = [
    '/conta',
    '/cadastrar-empresa',
    '/favoritos',
    '/viagens',
    '/anuncios'
  ]

  if (protectedPaths.some((p) => pathname.startsWith(p))) {
    if (!token) {
      const loginUrl = new URL('/login', origin)
      loginUrl.searchParams.set('callbackUrl', `${pathname}${search}`)
      return NextResponse.redirect(loginUrl)
    }

    if (pathname.startsWith('/anuncios') && !token.organizador) {
      return NextResponse.redirect(new URL('/unauthorized', origin))
    }

    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/anuncios/:path+', '/conta/:path*']
}
