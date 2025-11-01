// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value || req.headers.get('Authorization');

    // List of protected routes
    const protectedRoutes = ['/dashboard'];

    const { pathname } = req.nextUrl;

    if (protectedRoutes.includes(pathname) && !token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}
