// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      script: [{ src: "https://telegram.org/js/telegram-web-app.js" }],
    },
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
  },
  routeRules: {
    "/": {
      redirect: "/store",
    },
  },
  modules: ["@nuxtjs/tailwindcss", "nuxt-mongoose"],
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  runtimeConfig: {
    telegram: {
      botToken: "",
      apiSecret: "",
      useTestServer: false,
    },
  },
});
