import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Keeps React in strict mode (good practice)
  output: "standalone",  // Ensures Vercel handles dynamic routes properly
};

export default nextConfig;

