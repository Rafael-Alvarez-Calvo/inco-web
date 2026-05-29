/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: '#1a3a5c',
          dark:    '#142d47',
          light:   '#e8eef5',
        },
        amber: {
          DEFAULT: '#c17f3e',
          light:   '#f7ece0',
          dark:    '#a5692e',
        },
        stone: {
          50:  '#f5f4f1',
          100: '#ede9e2',
          200: '#d4cfc6',
          300: '#b8b0a3',
          400: '#8a8680',
          500: '#5a5650',
          600: '#2c2a27',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:  ['"Source Sans 3"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
