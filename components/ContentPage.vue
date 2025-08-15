<template>
  <DocumentDrivenNotFound v-if="!page" />

  <div v-else class="project-container content-maxed-padded">
    <!-- Text Content -->
    <div class="project-content scrollable-container">
      <div class="scrollable">
        <div>
          <h2>{{ page.title }}</h2>
          <h3 v-if="page.year" class="project-year">{{ page.year }}</h3>
        </div>

        <div v-if="page.body" class="project-description">
          <ContentRenderer :value="page.body" />
        </div>
        <div v-if="page.credits" class="project-credits">
          <MDC :value="page.credits" />
        </div>
        <slot />
        <show-dates
          v-if="page.dates"
          class="show-dates"
          :dates="page.dates"
          :sitemap="page.path"
        ></show-dates>
      </div>
    </div>

    <!-- Images Gallery with PhotoSwipe -->
    <div class="images-carousel-wrapper scrollable-container">
      <div class="scrollable">
        <div id="gallery" class="images-carousel">
          <a
            v-for="(image, index) in page.images"
            :key="index"
            :href="image.src"
            :data-pswp-width="image.width"
            :data-pswp-height="image.height"
            :data-pswp-caption="image.caption"
            target="_blank"
            :aria-label="`View image ${index + 1} for ${page.title}`"
            class="image-link"
          >
            <ThumbhashImageWithCredits :image="image" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useScrollIndicator } from "@/composables/scrollIndicator";

import { onMounted } from "vue";

useScrollIndicator();

const { page } = defineProps({
  page: {
    type: Object,
    required: true,
  },
});

import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

onMounted(() => {
  const lightbox = new PhotoSwipeLightbox({
    gallery: "#gallery",
    children: "a",
    bgOpacity: 1,
    showHideAnimationType: "none",
    initialZoomLevel: "fit",
    secondaryZoomLevel: 1,
    maxZoomLevel: 2,
    zoomAnimationDuration: false,
    preload: [1, 3],
    pswpModule: () => import("photoswipe"),
  });

  // Register custom caption element
  lightbox.on("uiRegister", function () {
    lightbox.pswp.ui.registerElement({
      name: "custom-caption",
      order: 7,
      isButton: false,
      appendTo: "root",
      html: "Caption text",
      onInit: (el, pswp) => {
        lightbox.pswp.on("change", () => {
          const currSlideElement = lightbox.pswp.currSlide.data.element;
          let captionHTML = "";

          if (currSlideElement) {
            // Get caption from data-pswp-caption attribute
            const caption = currSlideElement.getAttribute("data-pswp-caption");
            if (caption) {
              captionHTML = caption;
            }
          }

          el.innerHTML = "<span>" + (captionHTML || "") + "</span>";
        });
      },
    });
  });

  lightbox.init();
});
</script>

<style scoped>
/* Mobile: one-column layout with text on top */
.project-container {
  display: flex;
  flex-direction: column;
  gap: 8rem;
  text-align: justify;
  text-transform: lowercase;
}
.project-credits :deep(p) {
  margin-block-end: 0px;
  margin: 0px;
  margin-bottom: 0.5rem;
}
.images-carousel {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.show-dates {
  margin-top: 1rem;
}

:deep(.project-description h3:not(:first-child)),
:deep(.project-credits h3:not(:first-child)) {
  margin-top: 3rem;
  margin-bottom: 6px;
}

:deep(.project-description h3:first-child),
:deep(.project-credits h3:first-child) {
  margin-top: 0;
  margin-bottom: 6px;
}

:deep(p) {
  margin-top: 0rem;
  margin-bottom: 1rem;
}

:deep(iframe) {
  max-width: 100%;
  max-height: 40vh;
  margin-bottom: 1rem;
}
.scrollable {
  gap: 3rem;
  display: flex;
  flex-direction: column;
}

/* Gallery image styling */
.image-link {
  display: block;
  overflow: hidden;
  text-align: center;
  display: flex;
  justify-content: center;
  max-height: 75vh;
}

.image-link :deep(.image-wrapper) {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  max-height: 75vh;
}

.image-link :deep(img) {
  width: 100%;
  height: auto;
  object-fit: contain;
}

/* PhotoSwipe custom caption styling */
:global(.pswp__custom-caption) {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 1rem;
  text-align: center;
  font-size: 0.9rem;
  line-height: 1.4;
}

:global(.pswp__custom-caption span) {
  display: block;
}

/* Desktop: two-column layout with images on left and text on right */
@media screen and (min-width: 1080px) {
  .scrollable {
    padding-right: 2rem;
  }

  .project-container {
    flex-direction: row;
    gap: 4rem;
    height: 100%;
    padding-top: 0px;
    justify-content: space-between;
  }

  .project-content {
    flex: 0 0 50%;
  }

  .images-carousel-wrapper {
    flex: 0 1 40%;
  }
  .project-content > div,
  .images-carousel-wrapper > div {
    height: 100%;
    padding-top: 4rem;
    padding-bottom: 4rem;
    box-sizing: border-box;
  }
}

@media screen and (min-width: 1440px) {
  .project-container {
    gap: 10rem;
  }
}
</style>
