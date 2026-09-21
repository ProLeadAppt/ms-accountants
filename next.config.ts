import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/our-people.html", destination: "/about", permanent: true },
      { source: "/what-we-do.html", destination: "/services", permanent: true },
      { source: "/how-to-find-us.html", destination: "/contact", permanent: true },
      { source: "/what-our-clients-say.html", destination: "/client-stories", permanent: true },
    ];
  },
};

export default nextConfig;
