/** @type {import('next').NextConfig} */
const webpack = require('webpack');
const { i18n } = require('./next-i18next.config');
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  i18n,
  webpack: (config, { dev }) => {
      config.plugins.push(
          new webpack.ProvidePlugin({
              '$': 'jquery',
              'jQuery': 'jquery',
          })
      )
      return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.ap-southeast-1.amazonaws.com',
        port: '',
        pathname: '/**/*',
      },
    ],
  },
  env: {
    API_URL: process.env.API_URL||'http://localhost:3000',
    
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}
