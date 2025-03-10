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
};

export default withNextIntl(nextConfig);
