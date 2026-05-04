import { NextResponse } from 'next/server'

export function middleware(request) {
  const isAuthenticated = request.cookies.get('token')
  const { pathname } = request.nextUrl

  const isLoginPage = pathname === '/login'

  if (!isAuthenticated && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.json|icons|images).*)',
  ],
}