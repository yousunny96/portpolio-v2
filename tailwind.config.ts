import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        kanit: ['Kanit', 'Noto Sans KR', 'sans-serif'],
      },
      colors: {
        ink: '#0C0C0C',
        frost: '#D7E2EA',
      },
    },
  },
  plugins: [],
} satisfies Config
