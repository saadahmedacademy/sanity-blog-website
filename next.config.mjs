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

  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Prevent server-only modules from causing client-side issues
      config.resolve.fallback = {
        fs: false,
        path: false,
        os: false,
      };
    }

    return config;
  },

  output: "standalone", // Enable standalone build for production deployment
};

export default nextConfig;
