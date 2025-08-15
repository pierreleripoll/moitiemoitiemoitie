<template>
  <div class="image-wrapper">
    <ThumbhashImage :image="image" v-bind="$attrs" />
    <div v-if="image.caption" class="image-credits-tooltip">
      {{ image.caption }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  image: {
    type: Object,
    required: true,
  },
});

// Inherit all attributes from parent (like :lazy, :format, etc.)
defineOptions({
  inheritAttrs: false,
});
</script>

<style scoped>
.image-wrapper {
  position: relative;
  padding-bottom: 3em;
}

/* Image credits tooltip */
.image-credits-tooltip {
  position: absolute;
  bottom: 2em;
  left: 0;
  right: 0;
  color: black;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  line-height: 1.3;
  text-align: center;
  text-transform: lowercase;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.image-wrapper:hover .image-credits-tooltip {
  opacity: 1;
}
</style>
