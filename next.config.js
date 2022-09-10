/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['imgs.xkcd.com'],
  },
  // https://www.youtube.com/watch?v=pFT8wD2uRSE&t=24655s
  // 6:31:15
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
  },
};

module.exports = nextConfig;
