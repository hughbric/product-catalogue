/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'paddle.s3.amazonaws.com',
        port: '',
        pathname: '/user/**',
      },
    ],
  },
};

export default nextConfig;
