/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      width: {
        1200: "1200px",
      },
      backgroundColor: {
        primary: "#a5f3fc#",
        secondary: "#4ade80",
        tertiary: "###1f2937",
        tex_light: "#86efac",
        "overlay-30": "rgba(0, 0, 0, 0.3)",
        "overlay-70": "rgba(0, 0, 0, 0.7)",
      },
      maxWidth: {
        "600 ": "600px",
      },
      cursor: {
        pointer: "pointer",
      },
      flex: {
        3: "3 3 0%",
      },
      keyframes: {
        slideInFromLeft: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        slideInFromRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        slideInFromTop: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        slideInFromBottom: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(-100%)" },
        },
      },
      animation: {
        slideInFromLeft: "slideInFromLeft 5s linear infinite",
        slideInFromRight: "slideInFromRight 5s linear infinite",
        slideInFromTop: "slideInFromTop 5s linear infinite",
        slideInFromBottom: "slideInFromBottom 5s linear infinite",
      },
    },
  },
  plugins: [],
};
