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
        titleblack: '#282828',
        baseLine: '#F2F2F2',
        lightGray: '#C9C9C9',
        contentBlack: '#3F3F3F',
      },
    },
  },
  plugins: [],
} satisfies Config;
