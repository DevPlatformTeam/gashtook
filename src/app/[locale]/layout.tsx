import type { Metadata, Viewport } from "next";

import "./globals.css";

import { NextIntlClientProvider } from "next-intl";

import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
};

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const translations = {
    fa: {
      title: "گشتوک",
      description: "راهنمای گردشگری شهرهای ایران",
    },
    en: {
      title: "Gashtook",
      description: "Iranian Cities Travel Guide",
    },
  };

  if (
    !routing.locales.includes(params.locale as (typeof routing.locales)[number])
  ) {
    return notFound();
  }

  return {
    title: translations[params.locale as keyof typeof translations].title,
    description:
      translations[params.locale as keyof typeof translations].description,
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === "fa" ? "rtl" : "ltr"}
    >
      <head>
        <link
          href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body data-atm-ext-installed="1.29.6">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
