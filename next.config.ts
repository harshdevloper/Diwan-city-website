import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Images are pre-compressed to their final serving size in /public/images.
    // On-demand optimization (sharp resize + AVIF encode) OOM-kills Render's
    // 512 MB instance on the large plan images, so it stays off in every env.
    unoptimized: true,
  },
};

export default nextConfig;
