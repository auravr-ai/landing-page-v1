import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

const withNextIntl = require('next-intl/plugin')(
  // This is the default (also the `src` folder is supported out of the box)
  './i18n/request.ts'
);

export default withNextIntl(nextConfig);
