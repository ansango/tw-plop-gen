/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("./.theme-ui/src/index.js")],
  twui: {
    styled: true,
    themes: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: false,
  },
};
