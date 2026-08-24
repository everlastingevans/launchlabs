import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      { source: "/programmes", destination: "/programme", permanent: true },
      { source: "/founder-sprint", destination: "/programme", permanent: true },
      { source: "/sme-sprint", destination: "/programme", permanent: true },
      { source: "/sme-growth-sprint", destination: "/programme", permanent: true },
      { source: "/capital-readiness", destination: "/programme", permanent: true },
      { source: "/talent", destination: "/why-launchpath", permanent: true },
      { source: "/talent-layer", destination: "/why-launchpath", permanent: true },
      { source: "/partners", destination: "/sponsors", permanent: true },
      { source: "/venture-studio", destination: "/", permanent: true },
      { source: "/service-provider-marketplace", destination: "/sponsors", permanent: true }
    ];
  }
};

export default nextConfig;
