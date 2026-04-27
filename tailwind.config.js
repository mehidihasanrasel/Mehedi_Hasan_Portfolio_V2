/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      // CSS variables দিয়ে color define করা হয়েছে
      // যাতে dark/light mode-এ automatically রং পাল্টায়
      colors: {
        primary:  'var(--accent)',
        dark:     'var(--bg-primary)',
        second:   'var(--bg-secondary)',
        card:     'var(--bg-card)',
        textMain: 'var(--text-primary)',
        textSub:  'var(--text-secondary)',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
