import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
    remotePatterns: [],
  },
  reactCompiler: false,
};

export default nextConfig;
