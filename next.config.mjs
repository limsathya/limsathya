/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile @react-email components for server-side usage in API routes
  transpilePackages: ["@react-email/components"],
  // Tree-shake barrel imports (lucide-react ships hundreds of icons;
  // this rewrites imports to per-module paths at build time)
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
