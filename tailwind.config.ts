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
        blink: {
          '50%': { opacity: '0' },
        },
        fade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        blink: 'blink 1s step-start infinite',
        'fade-in': 'fade 0.25s ease-in-out',
      },
      colors: {
        sky: {
          '50': '#f0f8ff',
          '100': '#e1f0fd',
          '200': '#bbe2fc',
          '300': '#87cefa',
          '400': '#3cb1f4',
          '500': '#1296e5',
          '600': '#0678c3',
          '700': '#065f9e',
          '800': '#095183',
          '900': '#0e446c',
          '950': '#092b48',
        },
      },
      maxWidth: {
        container: '1366px',
      },
    },
  },
  plugins: [],
};
export default config;
