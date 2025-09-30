import type { Config } from 'tailwindcss';

export const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue}',
    './src/styles/**/*.css',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
