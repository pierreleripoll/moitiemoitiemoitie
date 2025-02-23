<template>
  <div class="app">
    <NuxtRouteAnnouncer />
    <Navbar> </Navbar>

    <div id="container" class="container">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
import { title } from "process";
import Navbar from "./components/Navbar.vue";

useSeoMeta({
  title: "Collectif Moitié Moitié Moitié",
  ogTitle: "Collectif Moitié Moitié Moitié",
  ogImage: "/android-chrome-192x192.png",
  description: "Collectif Moitié Moitié Moitié.",
  ogDescription: "Collectif Moitié Moitié Moitié.",
});

useHead({
  link: [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossorigin: "",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
    },
    {
      rel: "icon",
      href: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon.png",
    },
  ],
  title: "moitié moitié moitié",
  titleTemplate: (titleChunk) =>
    titleChunk == "moitié moitié moitié" || !titleChunk
      ? "moitié moitié moitié"
      : `${titleChunk} - moitié moitié moitié`,
  meta: [
    {
      name: "description",
      content:
        "Site du collectif moitié moitié moitié. Qui sont-ils, que font-ils et quand le font-ils ! Retrouvez leurs spectacles, prochaines dates, informations.",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
  ],
});

// Page not found, set correct status code on SSR
// if (!(page as any).value && import.server) {
//   const event = useRequestEvent();
//   if (event) {
//     event.node.res.statusCode = 404;
//   }
// }

// if (contentHead) {
//   useContentHead(page);
// }

onMounted(() => {
  interface Window {
    netlifyIdentity?: {
      on: (event: string, callback: (user?: any) => void) => void;
    };
  }
  if (window && window.netlifyIdentity) {
    window.netlifyIdentity.on("init", (user) => {
      if (!user) {
        window.netlifyIdentity?.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }
});
</script>
<style>
html {
  margin: 0;
  padding: 0;
  font-family: "Inter", "Monument Grotesk Variable", "Helvetica", Arial,
    sans-serif;
  font-optical-sizing: auto;
  overflow-y: overlay;
  /* text-transform: lowercase; */
  overflow-x: hidden;
  scrollbar-gutter: stable;
}

body {
  margin: 0px;
  padding: 0px;
}

h3 {
  font-size: x-large;
  font-weight: normal;
  margin: 0px;
  text-transform: lowercase;
}

h2 {
  font-size: xx-large;
  font-weight: normal;
  margin: 0px;
  text-transform: lowercase;
}

#__nuxt {
  /* height: 100vh; */
}

.app {
  padding: 0 2rem;
}

.container {
  text-align: start;

  max-width: 1500px;
  border-top: solid rgba(0, 0, 0, 0.6) 2px;

  margin: auto;
  padding-top: 8rem;
  padding-bottom: 8rem;

  /* margin-top: 6rem; */
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: nowrap;
}

.header {
  justify-content: space-between;
  text-align: start;
  margin: 0 auto;
  gap: 2em;
  width: 100%;
  z-index: 10;
}

.header h1 {
  font-size: 36px;
  font-weight: bold;
  text-align: start;
  flex-shrink: 1;
}

.header h2 {
  font-size: 24px;
  font-weight: normal;
  margin: auto 0;
  flex-shrink: 2;
}

a {
  color: var(--color-text);
  cursor: pointer;
  text-decoration: none;
  /* text-transform: uppercase; */
}

a:hover {
  text-decoration: underline rgba(0, 0, 0, 0.6) 2px;
  -webkit-text-decoration: underline rgba(0, 0, 0, 0.6) 2px;
  /* text-underline-offset: 2px; */
  -webkit-text-underline-offset: underline rgba(0, 0, 0, 0.6) 2px;
}

@media screen and (max-width: 1080px) {
  /* h3 {
    font-size: large;
  } */
  .container {
    padding: 0;
    border-top: solid rgba(0, 0, 0, 0.6) 2px;
    padding-top: 4rem;
  }
}

@media screen and (max-width: 920px) {
  /* h3 {
    font-size: large;
  } */
  .app {
    padding: 0 2rem;
  }
}

@media screen and (max-width: 720px) {
  html {
    scrollbar-gutter: initial;
  }
  .app {
    padding: 1.5rem;
  }
}

/* Mobile-specific styles */
@media screen and (max-width: 650px) {
  /* h3 {
    font-size: x-large;
  } */
}
</style>
