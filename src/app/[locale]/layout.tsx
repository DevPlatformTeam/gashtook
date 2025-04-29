import type { Metadata, Viewport } from "next";

import "./globals.css";

import { NextIntlClientProvider } from "next-intl";

import { getMessages } from "next-intl/server";

import { PwaAppRecommendationToast } from '@/components/PwaAppRecommendationToast/PwaAppRecommendationToast';

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
      title: "گشتوک | راهنمای گردشگری شهرهای ایران",
      description:
        "گشتوک | جاذبه های گردشگری، دیدنی و زیبایی های شهرهای ایران همراه با معرفی مراکز تفریحی، موزه ها و گالری ها، رستوران ها و کافه ها، هتل ها، مراکز خرید و ...",
      keywords:
        "گشتوک,gashtook,تهران,tehran,ایران,iran,جاذبه های گردشگری,جاذبه های گردشگری ایران,جاذبه های گردشگری شهر,جاذبه های گردشگری شهر های ایران,جاذبه های دیدنی شهر,دیدنی های شهر,مراکز تفریحی,موزه ها,گالری ها,رستوران ها,کافه ها,هتل ها,مراکز خرید,پارک ها",
    },
    en: {
      title: "Gashtook | Tourist Guide to Iranian Cities",
      description:
        "Gashtook | Tourist attractions, sights and beauties of Iranian cities along with introduction of entertainment centers, museums and galleries, restaurants and cafes, hotels, shopping malls and ...",
      keywords:
        "Gashtook,gashtook,tehran,iran,tourist attractions,tourist attractions of Iran,tourist attractions of the city,tourist attractions of Iranian cities,city sights,city sights,entertainment centers,museums,galleries,restaurants,cafes,hotels,shopping malls,parks",
    },
  };

  return {
    title: translations[params.locale as keyof typeof translations].title,
    description:
      translations[params.locale as keyof typeof translations].description,
    generator: "Next.js",
    manifest: "/manifest.json",
    keywords: [
      "gashtook",
      "Gashtook",
      "گشتوک",
      "gashtook-pwa",
      "gashtook-web-app",
    ],
    authors: [
      {
        name: "TurbojetWebTeam",
        url: "https://turbojetweb.ir",
      },
      {
        name: "Farzad Forouzanfar",
        url: "https://www.linkedin.com/in/farzad-forouzanfar-a1773b225/",
      },
      {
        name: "MohammadAli Attar",
        url: "https://www.linkedin.com/in/ali-attar-olyaei-923090214/",
      },
      {
        name: "Kourosh Salmanzadeh",
        url: "https://www.linkedin.com/in/kourosh-salmanzadeh-80796b25b/",
      },
    ],
    icons: [
      { rel: "apple-touch-icon", url: "/icons/icon-128x128.png" },
      { rel: "icon", url: "/icons/icon-128x128.png" },
    ],
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
    <html lang={locale} dir={locale === "fa" ? "rtl" : "ltr"}>
      <head>
        <link
          href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body data-atm-ext-installed="1.29.6" className="overflow-x-hidden">
        <NextIntlClientProvider messages={messages}>
          {children}
          <PwaAppRecommendationToast
            message={locale === 'fa' ? "اپ را از آیکون هوم اسکرین باز کنید تا سریع‌تر و بدون نوار آدرس اجرا شود." : "Open the app from the home screen icon to run faster and without the address bar."}
            duration={5000}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
