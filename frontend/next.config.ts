import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // @ts-ignore - Setting turbopack root as suggested by warning
  turbopack: {
    root: path.join(__dirname, ".."),
  },
};

export default nextConfig;
