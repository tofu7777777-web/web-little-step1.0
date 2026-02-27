/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["PingFang SC", "Microsoft YaHei", "sans-serif"],
      },
      fontSize: {
        title: ["32px", { lineHeight: "1.3" }],
        desc: ["24px", { lineHeight: "1.4" }],
        body: ["16px", { lineHeight: "1.5" }],
      },
      fontWeight: {
        title: "600",
        body: "400",
      },
      colors: {
        page: "#F8F7F3",
        "section-gray": "#E7E3DD",
        "task-default": "#FFFDF7",
        "task-done": "#C1FAE7",
        "btn-pink": "#FFC1D8",
        "border-light": "#E8E6E3",
        "text-primary": "#2C2C2C",
        "text-secondary": "#6B6B6B",
      },
      boxShadow: {
        soft: "0 1px 3px rgba(0,0,0,0.06)",
        pressed: "0 2px 6px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
}
