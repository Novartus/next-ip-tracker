/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_GEO_IPIFY_API_KEY: process.env.NEXT_PUBLIC_GEO_IPIFY_API_KEY,
  },
};

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  nextConfig,
};
