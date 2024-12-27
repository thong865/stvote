/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.edge",
    "./inertia/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Noto Sans Lao', 'sans-serif'],
      serif: ['Noto Sans Lao', 'serif'],
    },
  },
  plugins: [require('daisyui')],
}

