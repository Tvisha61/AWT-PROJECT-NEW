/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"], // ✅ Add your src folder
    theme: {
      extend: {
        colors: {
          primary: "#007BFF", // ✅ Custom color (Sky Blue for AINotes)
        },
      },
    },
    plugins: [],
  };
  