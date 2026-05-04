import { NextResponse } from 'next/server'

export function proxy(request) {
  const token = request.cookies.get('auth-token')?.value
  const isAuthPage = request.nextUrl.pathname === '/login'

  if (!isAuthPage && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}