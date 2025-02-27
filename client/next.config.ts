import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    CHALLENGE_URL: process.env.CHALLENGE_URL,
    SERVER_URI: process.env.SERVER_URI,
  },
};

export default nextConfig;
