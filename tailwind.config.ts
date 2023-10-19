import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        dim: {
          '0%': { opacity: '0.25' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        dim: 'dim 0.5s ease-in-out infinite alternate',
      },
      colors: {
        sky: {
          day: '#87cefa',
          night: '#201F27',
        },
      },
      maxWidth: {
        container: '1400px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
