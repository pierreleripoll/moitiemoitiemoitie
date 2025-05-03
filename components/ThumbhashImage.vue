<template>
  <div class="thumbhash-image-container" :style="containerStyle">
    <!-- Thumbhash placeholder - always show when available, fade out after image loads -->
    <div
      v-if="placeholderUrl"
      class="thumbhash-placeholder"
      :style="placeholderStyle"
    ></div>

    <!-- Actual Image -->
    <NuxtPicture
      ref="actualImage"
      class="actual-image"
      v-bind="$attrs"
      @load="onImageLoaded"
    />
  </div>
</template>

<script setup>
import { ref, computed, useAttrs } from "vue";
import { thumbHashToDataURL } from "thumbhash";

const props = defineProps({
  thumbhash: {
    type: String,
    default: null,
  },
  aspectRatio: {
    type: [Number, String],
    default: null,
  },
});

const attrs = useAttrs();
const placeholderUrl = ref("");
const imageLoaded = ref(false);

// Get current viewport information
const viewport = useViewport();

// Get responsive size based on current viewport
const imageSizes = computed(() => {
  if (!attrs.sizes) return null;

  const sizes = attrs.sizes.split(" ");
  const sizeMap = {};
  // Parse size entries (e.g., "450px", "md:650px", "xl:900px")
  sizes.forEach((size) => {
    if (size.includes(":")) {
      const [breakpoint, value] = size.split(":");
      sizeMap[breakpoint] = value;
    } else {
      sizeMap.default = size;
    }
  });

  const breakpoints = Object.keys(sizeMap)
    .filter((key) => key !== "default")
    .sort((a, b) => {
      // Common breakpoint order: xs < sm < md < lg < xl < 2xl
      const order = { xs: 1, sm: 2, md: 3, lg: 4, xl: 5, "2xl": 6 };
      return order[b] - order[a]; // Sort in descending order
    });

  for (const breakpoint of breakpoints) {
    if (viewport.isGreaterOrEquals(breakpoint)) {
      return sizeMap[breakpoint];
    }
  }

  return sizeMap.default || null;
});

// Process thumbhash immediately
if (props.thumbhash) {
  let time = performance.now();
  try {
    const binary = atob(props.thumbhash);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    console.log("Decoded thumbhash in", performance.now() - time, "ms");
    time = performance.now();
    placeholderUrl.value = thumbHashToDataURL(bytes);
    console.log(
      "Converted thumbhash to data URL in",
      performance.now() - time,
      "ms"
    );
  } catch (e) {
    console.error("Failed to decode thumbhash:", e);
  }
} else {
  console.log("No thumbhash provided.");
}

// Compute aspect ratio from width/height or use provided aspectRatio
const imageAspectRatio = computed(() => {
  // If aspect ratio is explicitly provided
  if (props.aspectRatio) {
    return typeof props.aspectRatio === "string"
      ? props.aspectRatio
      : `${props.aspectRatio}`;
  }

  // If image has width and height in attrs
  if (attrs.width && attrs.height) {
    return `${attrs.width}/${attrs.height}`;
  }

  return null;
});

const containerStyle = computed(() => {
  const style = {};

  // Add aspect ratio if available
  if (imageAspectRatio.value) {
    // style.aspectRatio = imageAspectRatio.value;
  }

  return style;
});

const placeholderStyle = computed(() => {
  const style = {
    backgroundImage: placeholderUrl.value
      ? `url(${placeholderUrl.value})`
      : "none",
    opacity: imageLoaded.value ? 0 : 1,
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    aspectRatio: imageAspectRatio.value,
  };

  // Apply max-width to match the image sizes if available
  if (imageSizes.value) {
    style.maxWidth = imageSizes.value;
    style.margin = "auto"; // Center the placeholder
  }

  return style;
});

function onImageLoaded() {
  setTimeout(() => {
    imageLoaded.value = true;
  }, 100);
}
</script>

<style scoped>
.thumbhash-image-container {
  position: relative;
  width: fit-content;
  overflow: hidden;
  min-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 80vh;
}

.thumbhash-placeholder {
  position: absolute;
  width: 100%;
  height: 100%;
  top: -8px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  max-height: 100%;
}

.actual-image {
  position: relative;
  max-width: 100%;
  height: auto;
  z-index: 2;
  display: block;
  /* opacity: 0.1; */
}

:deep(img) {
  max-width: 100%;
  max-height: 100%;
}
</style>
