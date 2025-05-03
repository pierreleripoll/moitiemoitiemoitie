<template>
  <UnLazyImage
    :thumbhash="thumbhash"
    :src-set="sources[0].srcSet"
    :style="`aspect-ratio: ${aspectRatio};`"
    auto-sizes
  />
</template>

<script setup>
import { UnLazyImage } from "#components";
import { computed } from "vue";

const props = defineProps({
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
  densities: {
    type: String,
    default: "x1 x2",
    required: false,
  },
  sizes: {
    type: String,
    default: "450px md:650px xl:900px",
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
      densities: props.densities,
      format: "webp",
    },
  });
  const jpegSrcset = img.getSizes(props.image.src, {
    sizes: props.sizes,
    modifiers: {
      quality: props.quality,
      densities: props.densities,
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
      srcSet: jpegSrcset.srcset,
    },
  ];
  console.log("sourcesComputed", sourcesComputed);
  return sourcesComputed;
});
</script>

<style scoped></style>
