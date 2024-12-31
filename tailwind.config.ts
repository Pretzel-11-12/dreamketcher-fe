import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      colors: {
        brand: {
          yellow: '#FBA250',
          blue: '#2E4072',
          gray: '#F2F2F2',
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        line: '#F2F2F2',
      },
    },
  },
  plugins: [],
} satisfies Config;
