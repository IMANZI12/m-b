/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAF9F6',
        surface: '#FFFFFF',
        ink: '#141414',
        muted: '#6B6862',
        line: '#E7E4DD',
        accent: '#2F4A3A',
      },
      fontFamily: {
        headline: ['Fraunces', 'serif'],
        body: ['Manrope', 'sans-serif'],
      },
      aspectRatio: {
        'product': '4/5',
      },
    },
  },
  plugins: [],
};