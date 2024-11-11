/** @type {import('@nuxtjs/tailwindcss').ModuleOptions['config']} */
module.exports = {
  content: ["./app/**/*.{js,vue,ts}"],
  theme: {
    extend: {
      colors: {
        // Copied from https://core.telegram.org/bots/webapps#themeparams
        bg_color: "var(--tg-theme-bg-color, #FFFFFF)",
        text_color: "var(--tg-theme-text-color, #000000)",
        hint_color: "var(--tg-theme-hint-color, #8E8E93)",
        link_color: "var(--tg-theme-link-color, #007AFF)",
        button_color: "var(--tg-theme-button-color, #007AFF)",
        button_text_color: "var(--tg-theme-button-text-color, #FFFFFF)",
        secondary_bg_color: "var(--tg-theme-secondary-bg-color, #EFEFF3)",
        header_bg_color: "var(--tg-theme-header-bg-color, #EFEFF3)",
        bottom_bar_bg_color: "var(--tg-theme-bottom-bar-bg-color, #EFEFF3)",
        accent_text_color: "var(--tg-theme-accent-text-color, #007AFF)",
        section_bg_color: "var(--tg-theme-section-bg-color, #FFFFFF)",
        section_header_text_color:
          "var(--tg-theme-section-header-text-color, #000000)",
        section_separator_color:
          "var(--tg-theme-section-separator-color, #C7C7CC)",
        subtitle_text_color: "var(--tg-theme-subtitle-text-color, #8E8E93)",
        destructive_text_color:
          "var(--tg-theme-destructive-text-color, #FF3B30)",
      },
    },
  },
  plugins: [],
};
