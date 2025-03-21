import intlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const intlConfig = {
  locales: ["fa", "en"],
  defaultLocale: "fa",
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/");
  const locale = segments[1];
  const token = request.cookies.get("token");
  const publicRoutes = ["/", "/download", "/contact-us", "/faq", "/about-us", "/rules"];

  // تعیین مقدار isAuthenticate بر اساس وجود توکن
  const isAuthenticated = token ? "true" : "false";

  // تابع کمکی برای ست کردن کوکی روی هر Response
  const setAuthCookie = (response: NextResponse) => {
    response.cookies.set("isAuthenticate", isAuthenticated);
    return response;
  };

  let response = NextResponse.next();
  response = setAuthCookie(response);

  // فیلتر کردن درخواست‌های استاتیک، API و فایل‌های _next
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/static/") ||
    pathname.startsWith("/public/") ||
    pathname.startsWith("/favicon.ico")
  ) {
    return response;
  }

  // اگر پارامتر زبان وجود نداشته باشد، ریدایرکت به /fa
  if (!segments[1]) {
    return setAuthCookie(NextResponse.redirect(new URL("/fa", request.url)));
  }

  // اگر زبان نامعتبر بود، ریدایرکت به /fa
  if (!intlConfig.locales.includes(locale)) {
    return setAuthCookie(NextResponse.redirect(new URL("/fa", request.url)));
  }

  // مسیرهای احراز هویت
  const isAuthRoute = segments[2] === "auth";

  if (isAuthRoute) {
    if (token) {
      return setAuthCookie(NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url)));
    }
    const intlResponse = intlMiddleware(intlConfig)(request);
    intlResponse.cookies.set("isAuthenticate", isAuthenticated);
    return intlResponse;
  }
  
  if (!token && segments[2] === "dashboard") {
    return setAuthCookie(NextResponse.redirect(new URL(`/${locale}/auth/login`, request.url)));
  }

  const isPublicRoute =
  publicRoutes.includes(`/${segments[2] || ""}`) ||
    segments.length === 3 || // `/fa/{city}` مسیر شهرها
    (segments.length === 4 && (segments[3] === "collections" || segments[3] === "city-details")) || // `/fa/{city}/collections` و `/fa/{city}/city-details`
    (segments.length === 5 && segments[3] === "collections") || // `/fa/{city}/collections/{slug}`
    (segments.length === 4 && segments[3] !== "auth"); // `/fa/{city}/{category}` -> مسیر دسته‌بندی‌ها به جز `/auth`

  if (isPublicRoute) {
    const intlResponse = intlMiddleware(intlConfig)(request);
    intlResponse.cookies.set("isAuthenticate", isAuthenticated);
    return intlResponse;
  }

  // اگر در مسیر احراز هویت نیست و توکن ندارد، به لاگین منتقل شود
  if (!token) {
    return setAuthCookie(NextResponse.redirect(new URL(`/${locale}/auth/login`, request.url)));
  } else if (token) {
    return response;
  }

  const intlResponse = intlMiddleware(intlConfig)(request);
  intlResponse.cookies.set("isAuthenticate", isAuthenticated);
  return intlResponse;
}

export const config = {
  matcher: ["/:path*"],
};
