/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/post",
        destination: "/",
        permanent: true,
      },
    ];
  },
};


module.exports = nextConfig;
