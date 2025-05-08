import { withContentlayer } from "next-contentlayer"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["avatars.githubusercontent.com", "images.unsplash.com"],
  },
  // Add env configuration for docs
  env: {
    NEXT_PUBLIC_DOCS_ENABLED: 'true'
  }
}

// Export direct config - no more conditional contentlayer
export default nextConfig
