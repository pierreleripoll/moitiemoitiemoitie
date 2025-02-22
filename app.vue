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
  title: "Maria Clara Castioni",
  ogTitle: "Maria Clara Castioni",
  ogImage: "/android-chrome-192x192.png",
  description:
    "Maria Clara Castioni's personal website showcasing her work, including her scenographic projects, exhibitions, and words.",
  ogDescription:
    "Maria Clara Castioni's personal website showcasing her work, including her scenographic projects, exhibitions, and words.",
});

useHead({
  script: [
    {
      src: "https://cloud.umami.is/script.js",
      defer: true,
      "data-website-id": "b8436e6a-506a-41ec-921f-d24f377f3620",
    },
  ],
  title: "moitié moitié moitié",
  titleTemplate: (titleChunk) => {
    return titleChunk == "moitié moitié moitié" || !titleChunk
      ? "moitié moitié moitié"
      : `${titleChunk} - moitié moitié moitié`;
  },
  meta: [
    {
      name: "description",
      content:
        "Site du collectif moitié moitié moitié. Qui sont-ils, que font-ils et quand le font-ils ! Retrouvez leurs spectacles, prochaines dates, informations. ",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
  ],
  link: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon.png",
    },
  ],
});

// Page not found, set correct status code on SSR
// if (!(page as any).value && import.meta.server) {
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
  font-family: "Monument Grotesk Variable", "Helvetica", Arial, sans-serif;
  overflow-y: overlay;
  /* text-transform: lowercase; */
  overflow-x: hidden;
  scrollbar-gutter: stable both-edges;
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

  max-width: 1300px;
  margin: auto;
  margin-top: 6rem;
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
  flex-wrap: nowrap;
  padding: 0 2rem;
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
  font-style: italic;
  text-decoration: underline dotted;
  -webkit-text-decoration: underline dotted;
  text-underline-offset: 2px;
  -webkit-text-underline-offset: underline dotted;
}

@media screen and (max-width: 920px) {
  /* h3 {
    font-size: large;
  } */
  .app {
    padding: 0 1rem;
  }
}

@media screen and (max-width: 720px) {
  html {
    scrollbar-gutter: initial;
  }
  .app {
    padding: 0px;
  }
}

/* Mobile-specific styles */
@media screen and (max-width: 650px) {
  /* h3 {
    font-size: x-large;
  } */
}
</style>
