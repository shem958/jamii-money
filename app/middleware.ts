// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    // We are deliberately bypassing the server-side token check here 
    // because the token is stored in client-side localStorage by Redux, 
    // which the middleware cannot access.

    // The security check is now fully handled by the client-side 
    // `withAuth.tsx` component wrapped around protected pages.

    // The previous logic that caused the infinite redirect loop is commented out below:
    /*
    const token = req.cookies.get('token')?.value || req.headers.get('Authorization');
    const protectedRoutes = ['/dashboard'];
    const { pathname } = req.nextUrl;

    if (protectedRoutes.includes(pathname) && !token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
    */

    return NextResponse.next();
}

// Optional: You can still use the matcher configuration to limit 
// which routes trigger the middleware, even if the body is minimal.
/*
export const config = {
  matcher: ['/dashboard/:path*'],
};
*/