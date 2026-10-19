import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // brochure photos are already lossy; one high quality step keeps them crisp on retina screens
    qualities: [90],
    deviceSizes: [640, 828, 1080, 1200, 1600, 1920],
  },
};

export default nextConfig;
