import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/guides/fragrance-allergen-disclosure-2026",
        destination: "/guides",
        permanent: false,
      },
      {
        source: "/guides/cosmetic-product-costing",
        destination: "/guides",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      // Tell Google not to index the auto-generated metadata image
      // routes — they're PNG responses, not pages. Without this,
      // Search Console reports them under "Crawled - currently not
      // indexed" forever and validation never clears.
      {
        source: "/icon",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
      {
        source: "/opengraph-image",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
      {
        source: "/twitter-image",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
      {
        source: "/apple-icon",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },
};

export default nextConfig;

