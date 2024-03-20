/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'fakestoreapi.com',
            port: '',
          },
          {
            protocol: 'https',
            hostname: 'utfs.io',
            port: '',
          },
        ],
      },
};

export default nextConfig;
