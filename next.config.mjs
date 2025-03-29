import createNextIntlPlugin from "next-intl/plugin";
import withPWA from "next-pwa";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        hostname: "picsum.photos",
        protocol: "https",
        pathname: "/**",
      },
      {
        hostname: process.env.BASE_URL_API_HOSTNAME,
        protocol: "http",
        pathname: "/**",
      },
      {
        hostname: process.env.BASE_URL_API_HOSTNAME,
        protocol: "https",
        pathname: "/**",
      },
    ],
  },
  output: "standalone",
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

export default withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
})(withNextIntl(nextConfig));
