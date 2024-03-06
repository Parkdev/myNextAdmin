/** @type {import('next').NextConfig} */

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/vdimages',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
