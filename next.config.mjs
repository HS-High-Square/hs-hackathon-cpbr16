/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  // i18n: {
  //   locales: ["en-US", "pt-BR"],
  //   defaultLocale: "pt-BR",
  //   domains: [
  //     {
  //       domain: ".com",
  //       defaultLocale: "en-US",
  //     },
  //     {
  //       domain: ".com.br",
  //       defaultLocale: "pt-BR",
  //     },
  //   ],
  // },
};

export default nextConfig;
