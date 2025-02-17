<template>
  <div class="collectif">
    <h2 class="collectif-title">le collectif</h2>
    <ContentDoc class="description" />
    <div id="gallery" class="images-gallery" v-if="images && images.length">
      <a
        v-for="(image, index) in images"
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
          :img-attrs="{ alt: image.caption || 'Image', loading: 'lazy' }"
        />
      </a>
    </div>
  </div>
</template>

<script setup>
const { page } = useContent();
const images = page.value.images || [];
</script>

<style scoped>
.collectif {
  max-width: 800px;
}

.collectif-title {
  text-align: end;
}

:deep(.description) {
  text-align: justify;
}
</style>
