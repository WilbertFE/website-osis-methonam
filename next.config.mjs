/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
        port: "",
        pathname: "/**",
      },
      {
        pathname: "/**",
        protocol: "http",
        hostname: "localhost",
        port: "3000",
      },
      {
        pathname: "/**",
        protocol: "https",
        hostname: "nextui.org",
        port: "",
      },
      {
        protocol: "https",
        pathname: "/**",
        hostname: "avatars.githubusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        pathname: "/**",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
