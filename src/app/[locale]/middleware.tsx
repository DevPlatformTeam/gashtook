// Remove client-side hooks and use Next.js middleware
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const isLoggedIn = request.cookies.get('isLoggedIn');

    if (!isLoggedIn) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
}
