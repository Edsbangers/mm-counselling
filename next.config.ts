import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/counselling-in-:slug",
        destination: "/area/:slug",
      },
    ];
  },
};

export default nextConfig;
