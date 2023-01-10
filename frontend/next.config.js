/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
	experimental: {
		appDir: true
	},
	images: { domains: ['pbs.twimg.com'], formats: ['image/avif', 'image/webp'], }
}

module.exports = nextConfig
