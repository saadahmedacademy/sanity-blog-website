/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io", // Corrected hostname
        pathname: "/**", // Allow all paths
      },
    ],
  },
};

export default nextConfig;
