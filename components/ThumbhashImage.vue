<template>
  <div
    class="image-container"
    :style="`aspect-ratio: ${aspectRatio}; width: 100%;`"
  >
    <UnLazyImage
      :thumbhash="thumbhash"
      :style="`aspect-ratio: ${aspectRatio};`"
      :sources="sources"
      :src="image.src"
      :alt="alt"
      auto-sizes=""
    />
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  lazy: {
    type: Boolean,
    default: true,
  },
  thumbhash: {
    type: String,
    default: null,
  },
  image: {
    type: Object,
    required: true,
  },
  format: {
    type: String,
    default: "webp",
    required: false,
  },
  aspectRatio: {
    type: Number,
    default: undefined,
    required: false,
  },
  quality: {
    type: [Number, String],
    default: 90,
    required: false,
  },
  sizes: {
    type: String,
    default: "450px  xl:900px",
    required: false,
  },
});

const alt = computed(() => {
  return props.image.caption || props.image.alt || "Image";
});

const thumbhash = computed(() => {
  return props.thumbhash || props.image.thumbhash;
});

const aspectRatio = computed(() => {
  return props.aspectRatio || props.image.ratio;
});

const img = useImage();

const sources = computed(() => {
  const webpSizes = img.getSizes(props.image.src, {
    sizes: props.sizes,
    modifiers: {
      quality: props.quality,
      format: "webp",
    },
  });
  const jpegSizes = img.getSizes(props.image.src, {
    sizes: props.sizes,
    modifiers: {
      quality: props.quality,
      format: "jpeg",
    },
  });
  const sourcesComputed = [
    {
      type: "image/webp",
      srcSet: webpSizes.srcset,
    },
    {
      type: "image/jpeg",
      srcSet: jpegSizes.srcset,
    },
  ];
  // console.log("sourcesComputed", sourcesComputed);
  return sourcesComputed;
});
</script>

<style scoped>
.image-container:deep(img) {
  object-fit: cover;
  max-width: 100%;
  max-height: 100%;
  height: 100%;
  width: auto;
}
</style>
