/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		domains: ['a.espncdn.com', 's.espncdn.com'],
	},
};

module.exports = nextConfig;
