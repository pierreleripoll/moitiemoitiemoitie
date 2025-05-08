export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/image",
    "@nuxt/fonts",
    "@nuxtjs/seo",
    "@nuxt/content",
    "nuxt-viewport",
    "@unlazy/nuxt",
  ],
  image: {
    provider: "ipx",
    // The screen sizes predefined by `@nuxt/image`:
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1080,
      xl: 1280,
      xxl: 1536,
      "2xl": 1536,
    },
  },
  viewport: {
    breakpoints: {
      desktop: 1024,
      desktopMedium: 1280,
      desktopWide: 1600,

      mobile: 320,
      mobileMedium: 375,
      mobileWide: 425,

      tablet: 768,
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      "2xl": 1536,
    },

    cookie: {
      expires: 365, // 365 days
      name: "viewport",
      path: "/",
      sameSite: "Strict",
      secure: true,
    },

    defaultBreakpoints: {
      desktop: "desktop",
      mobile: "mobile",
      tablet: "tablet",
    },

    fallbackBreakpoint: "desktop",

    feature: "minWidth",
  },
  sourcemap: true,
  ssr: true,
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
