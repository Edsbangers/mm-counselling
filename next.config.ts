import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Barrel-optimise the icon and date libraries so only the icons/helpers
  // actually used are bundled, rather than the whole package. Trims unused JS.
  experimental: {
    optimizePackageImports: ["lucide-react", "date-fns"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/counselling-in-:slug",
        destination: "/area/:slug",
      },
      // Dedicated couples landing pages per town. Portsmouth and Southsea have
      // their own static pages (matched first); other towns resolve here.
      {
        source: "/couples-counselling-:slug",
        destination: "/couples-area/:slug",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "mm-counselling.co.uk" }],
        destination: "https://www.mm-counselling.co.uk/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
