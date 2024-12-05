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
  // images: {
  //   domains: ["bazar-bridge.5dhub.tech", "xtonwallet.com"],
  // },
};

export default nextConfig;
