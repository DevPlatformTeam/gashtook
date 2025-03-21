import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns : [{
      hostname: "picsum.photos" ,
      protocol: "https",
      pathname: "/**"
    },
    {
      hostname: process.env.BASE_URL_API_HOSTNAME,
      protocol: "http",
      pathname: "/**"
    },
    {
      hostname: process.env.BASE_URL_API_HOSTNAME,
      protocol: "https",
      pathname: "/**"
    },
  ]
  },
  output: "standalone", // مطمئن شو که خروجی استاتیک مشکل ندارد
  headers: async () => [
    {
      source: "/:path*.apk",
      headers: [
        {
          key: "Content-Type",
          value: "application/vnd.android.package-archive",
        },
      ],
    },
  ],
};

export default withNextIntl(nextConfig);
