import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Vazirmatn } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const vazirmatn = Vazirmatn({
  subsets: ["latin", "arabic"],
  display: "swap",
});

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
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={vazirmatn.className}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
