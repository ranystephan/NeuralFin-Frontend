import { withContentlayer } from "next-contentlayer"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["avatars.githubusercontent.com", "images.unsplash.com"],
  },
  experimental: {
    // The appDir option has been removed as it's the default in Next.js 14+
  },
  // Add env configuration for contentlayer
  env: {
    NEXT_PUBLIC_CONTENTLAYER_ENABLED: process.env.NODE_ENV !== 'production' ? 'true' : 'false'
  }
}

// Only use contentlayer in development, not in production build
// This avoids issues with markdown-wasm in production builds
const isProduction = process.env.NODE_ENV === 'production';
console.log("Building for: ", process.env.NODE_ENV, "isProduction:", isProduction);
export default isProduction ? nextConfig : withContentlayer(nextConfig)
