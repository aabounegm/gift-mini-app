/** @type {import('@nuxtjs/tailwindcss').ModuleOptions['config']} */
module.exports = {
  content: ["./app/**/*.{js,vue,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#007AFF",
        "accent-cyan": "#5AC8FA",
        "accent-gold": "#F1AA05",
        icons: "#959595",
      },
    },
  },
  plugins: [],
};
