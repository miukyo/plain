/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/p",
        destination: "/",
        permanent: true,
      },
      {
        source: "/u",
        destination: "/",
        permanent: true,
      },
    ];
  },
};


module.exports = nextConfig;
