/** @type {import('@nuxtjs/tailwindcss').ModuleOptions['config']} */
module.exports = {
  content: ["./app/**/*.{js,vue,ts}"],
  theme: {
    extend: {
      colors: {
        // Copied from https://core.telegram.org/bots/webapps#themeparams
        bg_color: "var(--tg-theme-bg-color)",
        text_color: "var(--tg-theme-text-color)",
        hint_color: "var(--tg-theme-hint-color)",
        link_color: "var(--tg-theme-link-color)",
        button_color: "var(--tg-theme-button-color)",
        button_text_color: "var(--tg-theme-button-text-color)",
        secondary_bg_color: "var(--tg-theme-secondary-bg-color)",
        header_bg_color: "var(--tg-theme-header-bg-color)",
        bottom_bar_bg_color: "var(--tg-theme-bottom-bar-bg-color)",
        accent_text_color: "var(--tg-theme-accent-text-color)",
        section_bg_color: "var(--tg-theme-section-bg-color)",
        section_header_text_color: "var(--tg-theme-section-header-text-color)",
        section_separator_color: "var(--tg-theme-section-separator-color)",
        subtitle_text_color: "var(--tg-theme-subtitle-text-color)",
        destructive_text_color: "var(--tg-theme-destructive-text-color)",
      },
    },
  },
  plugins: [],
};
