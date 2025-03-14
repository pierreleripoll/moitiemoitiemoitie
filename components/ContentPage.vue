<template>
  <DocumentDrivenNotFound v-if="!page" />

  <div v-else class="project-container">
    <!-- Text Content -->
    <div class="project-content scrollable">
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

    <!-- Images Gallery with PhotoSwipe -->
    <div class="images-carousel-wrapper scrollable">
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
            :imgAttrs="{ alt: image.caption, loading: 'lazy' }"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

const { page } = defineProps({
  page: {
    type: Object,
    required: true,
  },
});

console.log(page);
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

onMounted(() => {
  const lightbox = new PhotoSwipeLightbox({
    gallery: "#gallery",
    children: "a",
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
  gap: 10rem;
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
  gap: 5rem;
}

.project-content {
  gap: 2rem;
  display: flex;
  flex-direction: column;
}

.show-dates {
  margin-top: 1rem;
}

/* Desktop: two-column layout with images on left and text on right */
@media screen and (min-width: 1080px) {
  .project-container {
    flex-direction: row;
    gap: 4rem;
    height: 100%;
    padding-top: 0px;
  }

  .project-content {
    flex: 0 0 50%;
    /* position: sticky;
    top: 6rem; */
  }

  .images-carousel {
    flex: 0 0 50%;
  }
  .project-content,
  .images-carousel-wrapper {
    height: 100%;
    padding-top: 4rem;
    padding-bottom: 4rem;
    box-sizing: border-box;
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
