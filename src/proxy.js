import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
 
export async function proxy(request) {
    const { pathname } = request.nextUrl

    const session = await auth.api.getSession({
        headers: await headers(),
        // request: request 
    })
    // console.log(session);
    
    console.log("Current Path:", pathname, "Session Found:", !!session);

    if (!session) {
        if (pathname !== '/login') {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    return NextResponse.next()
}
 
export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/funding', 
    '/donation-requests/:path' 
  ],
}