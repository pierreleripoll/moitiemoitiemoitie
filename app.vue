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
html,
body {
  margin: 0;
  padding: 0;
  height: 100%; /* Let’s ensure html and body both go full height */
}

html {
  font-family: "Inter", "Monument Grotesk Variable", "Helvetica", Arial,
    sans-serif;
  font-optical-sizing: auto;
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
  height: 100%;
}

.app {
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 1500px;
  margin: auto;

  overflow-x: hidden;
}

.container {
  text-align: start;
  flex: 1;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: nowrap;
  overflow: hidden;
  scrollbar-color: rgba(0, 0, 0, 0.6);
  scrollbar-width: 2px;
  width: 100%;
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
  text-underline-offset: 2px;
  -webkit-text-underline-offset: 2px;
}

@media screen and (min-width: 1080px) {
  .container > * {
    padding-top: 8rem;
  }

  .scrollable::-webkit-scrollbar {
    width: 2px;
  }

  .scrollable::-webkit-scrollbar-track {
    background: transparent;
    /* If you want a vertical “line” vibe, 
     you can do e.g. border-left: 2px solid black; 
     or border-right, depending on look 
  */
  }

  .scrollable::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.6); /* color of the thumb */
    background-clip: padding-box;
    border-top: 6rem solid rgba(0, 0, 0, 0);
    border-bottom: 6rem solid rgba(0, 0, 0, 0);
  }

  /* Optional: hover effect if you want a darker tone on hover */
  .scrollable::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }

  .scrollable {
    padding-right: 4rem;
    overflow-y: scroll;
  }
}

@media screen and (max-width: 1080px) {
  /* h3 {
    font-size: large;
  } */
  .app {
    height: fit-content;
  }

  .container {
    padding: 0;
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
