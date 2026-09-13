import type { NextConfig } from "next";
import { legacyProjectRedirects } from "./data/legacy-redirects";

const nextConfig: NextConfig = {
  async redirects() {
    return Object.entries(legacyProjectRedirects).map(([from, to]) => ({
      source: `/projects/${from}`,
      destination: `/projects/${to}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
