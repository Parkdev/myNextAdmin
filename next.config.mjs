/** @type {import('next').NextConfig} */

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/vd-images',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
