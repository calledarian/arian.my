import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Link",
            value: "<https://arian.cheddybytes.com/>; rel=\"canonical\"",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
