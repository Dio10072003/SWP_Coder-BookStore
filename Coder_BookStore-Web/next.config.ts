/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn0.fahasa.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images-na.ssl-images-amazon.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'covers.openlibrary.org',
        port: '',
        pathname: '/**', // It's good practice to include '/**' for full path matching
      },
      // --- Added new remote patterns ---
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Google User Content / Photos
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Cloudinary
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com', // Vercel Blob/Storage
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org', // Wikimedia Commons
        port: '',
        pathname: '/**',
      },
      // --- End of new remote patterns ---
    ],
    // The 'domains' array is deprecated in Next.js 13 and later in favor of remotePatterns.
    // However, if you're on an older version or prefer to keep it for redundancy,
    // you should align it with your remotePatterns hostnames.
    // For Next.js 13+, you can safely remove this 'domains' array.
    domains: [
      'images.unsplash.com', // Still useful if you use Unsplash directly
      'images-na.ssl-images-amazon.com',
      'placehold.co',
      'lh3.googleusercontent.com', // Add newly allowed domains here if still using 'domains'
      'res.cloudinary.com',
      'upload.wikimedia.org'
      // Note: '*.public.blob.vercel-storage.com' cannot be directly put into 'domains'
      // because 'domains' doesn't support wildcards. Only 'remotePatterns' does.
    ],
  },
};

export default nextConfig;
