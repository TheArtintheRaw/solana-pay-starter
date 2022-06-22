/**  @type {import ('next').NextConfig} */ 
const nextConfig = {
  reactStrictMode: true,  
  
    experimental: {
      images: {
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],

        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'https://ghostlifeclub.mypinata.cloud',
            port: '',
            pathname: '/ipfs/**',
          },
        ],
      },
    },


}

module.exports = nextConfig
