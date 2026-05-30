import type { NextConfig } from "next"

const isGithubPages = process.env.GITHUB_PAGES === "true"

const nextConfig: NextConfig = {
  reactCompiler: true,
  typedRoutes: true,
  ...(isGithubPages
    ? {
        basePath: "/admin",
        output: "export" as const,
        trailingSlash: true,
        images: {
          unoptimized: true,
        },
      }
    : {}),
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
}

export default nextConfig
