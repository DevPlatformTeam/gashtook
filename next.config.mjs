import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://ca55-38-180-219-95.ngrok-free.app/api/:path*',
      },
    ];
  },
  images: {
    remotePatterns : [{
      hostname: "picsum.photos" ,
      protocol: "https",
      pathname: "/**"
    },
    {
      hostname: process.env.BASE_URL_API_HOSTNAME,
      protocol: process.env.PROTOCOL_NEXT_CONFIG,
      pathname: "/**"
    },
  ]
  },
};

export default withNextIntl(nextConfig);
