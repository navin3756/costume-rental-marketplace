import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#6D28D9',
          light: '#A855F7',
          dark: '#4C1D95'
        }
      }
    }
  },
  plugins: []
};

export default config;
