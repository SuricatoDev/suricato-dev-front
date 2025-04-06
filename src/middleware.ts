// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const token = await getToken({ req: request })

  if (pathname.startsWith('/conta')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
  }

  if (pathname.startsWith('/anuncios')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    if (!token.organizador) {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/anuncios/:path+', '/conta/:path*']
}
