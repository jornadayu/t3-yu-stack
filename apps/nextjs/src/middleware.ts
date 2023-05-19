import { NextResponse, type NextRequest } from 'next/server'

import { getAuth, withClerkMiddleware } from '@clerk/nextjs/server'

const PUBLIC_PATHS: Array<string> = ['/', '/sign-in*', '/sign-up*']

// Set the paths that don't require the user to be signed in
const isPublic = (path: string) => {
  return PUBLIC_PATHS.find((x) => path.match(new RegExp(`^${x}$`.replace('*$', '($|/)'))))
}

export default withClerkMiddleware((request: NextRequest) => {
  if (isPublic(request.nextUrl.pathname)) {
    return NextResponse.next()
  }
  // if the user is not signed in redirect them to the sign in page.
  const { userId } = getAuth(request)

  if (!userId) {
    // redirect the users to /pages/sign-in/[[...index]].ts

    const signInUrl = new URL('/sign-in', request.url)
    signInUrl.searchParams.set('redirect_url', request.url)
    return NextResponse.redirect(signInUrl)
  }
  return NextResponse.next()
})

export const config = { matcher: '/((?!_next/image|_next/static|favicon.png).*)' }
