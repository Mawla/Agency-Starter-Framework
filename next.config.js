/** @type {import('next').NextConfig} */
const locales = require("./locales.js");

const PicoSanity = require("picosanity");

const client = new PicoSanity({
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "development",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  apiVersion: "2021-03-25",
  useCdn: process.env.NODE_ENV === "production",
});

module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  i18n: {
    locales,
    defaultLocale: "en",
    localeDetection: false,
  },
  async rewrites() {
    return {
      afterFiles: [
        { source: "/sitemap.xml", destination: "/api/sitemap-xml" },
        { source: "/cms", destination: "/cms/index.html" },
        { source: "/cms/:path*", destination: "/cms/index.html" },
      ],
    };
  },
  async redirects() {
    const redirects = await client.fetch(
      `*[_type == "redirect"]{ source, destination, permanent }`,
    );
    return redirects;
  },

  /**
   * `dangerouslyAllowSVG` is a property in Next.js that allows loading of SVG images with external resources.
   * However, it should be used with caution due to potential security vulnerabilities.
   * Make sure to understand the risks and take appropriate security measures before using it.
   *
   * Read more: https://nextjs.org/docs/api-reference/next/image#dangerously-allow-svg
   */
  images: {
    domains: ["cdn.sanity.io", "images.unsplash.com"],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: true,
  },
  async headers() {
    const headers = [
      {
        source: "/opengraph-image",
        headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
      },
    ];

    const preventIndexing = await client.fetch(
      `*[_id == "config_seo"][0].preventIndexing`,
    );

    if (
      process.env.NEXT_PUBLIC_VERCEL_ENV !== "production" ||
      preventIndexing
    ) {
      headers.push({
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex",
          },
        ],
        source: "/:path*",
      });
    }
    return headers;
  },
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    if (!isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        swiper: {
          test: /[\\/]node_modules[\\/](swiper)[\\/]/,
          name: "swiper",
          priority: 10,
          reuseExistingChunk: false,
        },
      };
    }

    return config;
  },
};
