export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/content", "@nuxt/image", "@nuxt/fonts", "@nuxtjs/seo"],
  content: {
    documentDriven: true,
  },
  sourcemap: true,
  nitro: {
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true,
      failOnError: false,
    },
  },
  devServer: {
    host: "0.0.0.0", // Listen on all network interfaces
    port: 3000, // Ensure this matches your desired port
  },
  site: {
    url: "https://moitiemoitiemoitie.ch/",
    name: "Collectif Moitié Moitié Moitié",
    description:
      "Le site du Collectif de théâtre Moitié Moitié Moitié. Leurs spectacles, leurs projets, leurs actualités.",
  },
  app: {
    head: {
      title: "Moitié Moitié Moitié",
      charset: "utf-8",
      viewport: "width=device-width",
    },
  },

  compatibilityDate: "2024-08-26",
});
