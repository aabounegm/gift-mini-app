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
        "label-secondary": "#8E8E93",
        "label-date": "#6D6D71",
        "bg-secondary": "#EFEFF3",
      },
    },
  },
  plugins: [],
};
