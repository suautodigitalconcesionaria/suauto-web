/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['react-simple-maps'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'dl.airtable.com' },
      { protocol: 'https', hostname: 'v5.airtableusercontent.com' },
    ],
  },
}

module.exports = nextConfig
