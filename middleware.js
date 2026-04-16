// middleware.ts (root of project)
import { NextResponse } from 'next/server'

export function middleware(request) {
  const isAuthenticated = request.cookies.get('token') // or your auth check
  const isLoginPage = request.nextUrl.pathname === '/login'

  if (!isAuthenticated && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}