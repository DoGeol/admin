import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactCompiler: true,
  typedRoutes: true,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
}

export default nextConfig
