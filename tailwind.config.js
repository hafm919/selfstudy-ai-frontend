/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
          colors: {
            beige: "#f9f6f0",
            dark: "#001d3d",
            yellow: "#ffd60a"
          },
        },
      },
    plugins: [],
  }