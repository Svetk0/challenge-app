/** @type {import('next').NextConfig} */
import path from "path";

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(process.cwd(), "styles")],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@styles": path.resolve(process.cwd(), "src/styles/"),
    };
    return config;
  },

};

export default nextConfig;
