/** @type {import('next').NextConfig} */
const backendOrigin = (
  process.env.NEXT_PUBLIC_API_ORIGIN ??
  process.env.API_ORIGIN ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://werentbackend.onrender.com/api"
)
  .replace(/\/+$/, "")
  .replace(/\/api$/, "");

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${backendOrigin}/api/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eycxbcuxaswoobhsnmai.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
         protocol: "https",
         hostname: "placehold.co",
       }
       ,
       {
        protocol: "https",
        hostname: "images.unsplash.com",
       }
    ],
  },
};

module.exports = nextConfig;