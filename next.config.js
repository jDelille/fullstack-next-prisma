/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: true,
	},
	images: {
		domains: [
			'a.espncdn.com',
			's.espncdn.com',
			'giphy.com',
			'media0.giphy.com',
			'media1.giphy.com',
			'media2.giphy.com',
			'media3.giphy.com',
		],
	},
};

module.exports = nextConfig;
