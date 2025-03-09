import intlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const intlConfig = {
  locales: ['en', 'fa'],
  defaultLocale: 'en',
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (!pathname.includes('/auth')) {
    const segments = pathname.split('/');
    if (segments.length > 2) {
      const locale = segments[1];
      const token = request.cookies.get('token');
      if (!token) {
        const loginUrl = new URL(`/${locale}/auth/login`, request.url);
        return NextResponse.redirect(loginUrl);
      }
    }
  }
  
  return intlMiddleware(intlConfig)(request);
}

export const config = {
  matcher: ["/(fa|en)/:path*"],
};
