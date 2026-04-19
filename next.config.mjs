/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
<<<<<<< HEAD
        protocol: "https",
        hostname: "eycxbcuxaswoobhsnmai.supabase.co",
        pathname: "/storage/v1/object/public/**",
=======
        protocol: 'https',
        hostname: 'example.com', // Biarkan jika masih ada data lama yang memakainya
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // TAMBAHKAN INI
>>>>>>> 4144975 (fix: update type to Product to resolve category error)
      },
    ],
  },
};

<<<<<<< HEAD
export default nextConfig;
=======
export default nextConfig; // Sesuaikan jika kamu menggunakan CommonJS (module.exports)
>>>>>>> 4144975 (fix: update type to Product to resolve category error)
