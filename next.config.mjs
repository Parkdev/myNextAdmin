/** @type {import('next').NextConfig} */

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/VDimages',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
