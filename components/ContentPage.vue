<template>
  <DocumentDrivenNotFound v-if="!page" />

  <div v-else class="project-container">
    <!-- Text Content -->
    <div class="project-content">
      <h2>{{ page.title }}</h2>
      <h3 v-if="page.year" class="project-year">{{ page.year }}</h3>
      <div v-if="page.description" class="project-description">
        <MDC :value="page.description" />
      </div>
      <div v-if="page.credits" class="project-credits">
        <MDC :value="page.credits" />
      </div>
    </div>

    <!-- Images Gallery with PhotoSwipe -->
    <div id="gallery" class="images-carousel">
      <a
        v-for="(image, index) in page.images"
        :key="index"
        :href="image.src"
        :data-pswp-width="image.width || 800"
        :data-pswp-height="image.height || 600"
        target="_blank"
        class="image-wrapper"
      >
        <NuxtPicture
          :src="image.src"
          format="avif,webp"
          sizes="450px md:650px xl:900px"
          densities="x1 x2"
          quality="90"
          loading="lazy"
          :img-attrs="{ alt: image.caption, loading: 'lazy' }"
        />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
const { page } = useContent();

import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

onMounted(() => {
  const lightbox = new PhotoSwipeLightbox({
    gallery: "#gallery a",
    pswpModule: () => import("photoswipe"),
  });
  lightbox.init();
});
</script>

<style scoped>
/* Mobile: one-column layout with text on top */
.project-container {
  display: flex;
  flex-direction: column;
}

.project-content,
.images-carousel {
  padding-top: 1rem;
}

.images-carousel {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

/* Desktop: two-column layout with images on left and text on right */
@media screen and (min-width: 1080px) {
  .project-container {
    flex-direction: row-reverse;
    gap: 2rem;
  }

  .project-content {
    flex: 0 0 40%;
    position: sticky;
    top: 6rem;
    overflow-y: auto;
  }

  .images-carousel {
    flex: 0 0 60%;
  }
}

/* Gallery image styling */
.image-wrapper {
  display: block; /* Anchor element behaves as a block for layout */
  overflow: hidden;
  text-align: center;
}

/* Constrain the image size inside NuxtPicture */
:deep(img) {
  max-width: 100%;
  max-height: 80vh; /* Ensure images never exceed viewport height */
  object-fit: contain;
}
</style>
