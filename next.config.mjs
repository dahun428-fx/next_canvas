/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: false,
	async redirects() {
		return [
			{
				source: '/',
				destination: '/dashboard/nation-wide',
				permanent: true,
			},
		];
	},
};

export default nextConfig;
