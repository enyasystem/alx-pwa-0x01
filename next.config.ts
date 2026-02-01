import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: [
      'm.media-amazon.com',
      'moviepooper.com',
      'www.rottentomatoes.com',
      'rottentomatoes.com',
      'themebeyond.com',
      '*',
    ],
    unoptimized: true,
  },
};

export default nextConfig;
