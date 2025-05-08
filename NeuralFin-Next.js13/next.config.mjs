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

export default nextConfig
