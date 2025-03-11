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
  const publicRoutes = [
    "/",
    "/download",
    "/contact-us",
    "/faq",
    "/about-us",
    "/rules",
  ];

  // ❌ درخواست‌های مربوط به فایل‌های استاتیک، API و next/ را فیلتر کن
  if (
    pathname.startsWith("/_next/") || // فایل‌های داخلی نکست
    pathname.startsWith("/api/") || // APIها
    pathname.startsWith("/static/") || // فایل‌های استاتیک (مثلاً تصاویر)
    pathname.startsWith("/public/") || // فایل‌های public
    pathname.startsWith("/favicon.ico") // آیکون سایت
  ) {
    return NextResponse.next();
  }

  // ✅ مشکل ۱: اگر پارامتر زبان وجود نداشت، ریدایرکت به /fa
  if (!segments[1]) {
    return NextResponse.redirect(new URL("/fa", request.url));
  }

  // ✅ مشکل ۲: اگر زبان نامعتبر بود، 404 نمایش بده یا ریدایرکت کن
  if (!intlConfig.locales.includes(locale)) {
    return NextResponse.redirect(new URL("/fa", request.url)); // یا return NextResponse.next() برای 404
  }

  if (!token && segments[2] == "dashboard") {
    return NextResponse.redirect(new URL(`/${locale}/auth/login`, request.url));
  }

  const isPublicRoute =
    publicRoutes.includes(`/${segments[2] || ""}`) ||
    segments.length === 3 || // `/fa/{city}` مسیر شهرها
    segments.length === 4 && segments[3] === "collections" || // `/fa/{city}/collections`
    segments.length === 5 && segments[3] === "collections"; // `/fa/{city}/collections/{slug}`

  if (isPublicRoute) {
    return intlMiddleware(intlConfig)(request);
  }

  // مسیرهای احراز هویت
  const isAuthRoute = segments[2] === "auth";

  if (isAuthRoute) {
    if (token) {
      return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
    }
    return intlMiddleware(intlConfig)(request);
  }

  // اگر در مسیر احراز هویت نیست و توکن ندارد، به لاگین منتقل شود
  if (!token) {
    return NextResponse.redirect(new URL(`/${locale}/auth/login`, request.url));
  }

  return intlMiddleware(intlConfig)(request);
}

export const config = {
  matcher: ["/:path*"], // ✅ این باعث می‌شود همه مسیرها بررسی شوند
};
