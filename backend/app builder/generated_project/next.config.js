// next.config.js
/**
 * Next.js configuration
 * - Enables React Strict Mode
 * - Configures allowed image domains (add your domains to the array)
 * - Forwards selected environment variables to the client side
 * - Sets up rewrites for SEO‑friendly routes (e.g., /blog/:slug → /blog/[slug])
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode for all pages
  reactStrictMode: true,

  // Image component configuration – add any external domains you need to load images from
  images: {
    domains: [
      // 'example.com',
      // 'cdn.anotherdomain.com',
    ],
  },

  // Environment variables that should be exposed to the browser.
  // Only variables prefixed with NEXT_PUBLIC_ are automatically exposed by Next.js,
  // but you can also forward custom ones here.
  env: {
    // Example of forwarding a custom variable (uncomment and set in your environment)
    // API_URL: process.env.API_URL,
    // Add any other variables you need on the client side.
  },

  // Rewrites allow you to map pretty URLs to the actual page routes.
  // The example below maps `/blog/:slug` to the Next.js page located at `/blog/[slug].js`.
  async rewrites() {
    return [
      {
        source: '/blog/:slug',
        destination: '/blog/[slug]', // Matched parameters are passed automatically
      },
      // Add more rewrites here as needed
    ];
  },
};

module.exports = nextConfig;
