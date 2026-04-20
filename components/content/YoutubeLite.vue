<template>
  <div class="yt-lite" @click="activate">
    <template v-if="activated">
      <iframe
        :src="`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&iv_load_policy=3&modestbranding=1`"
        :title="title"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      />
    </template>
    <template v-else>
      <img
        :src="`https://i.ytimg.com/vi/${id}/hqdefault.jpg`"
        :alt="title"
        loading="lazy"
      />
      <button type="button" class="yt-lite-play" :aria-label="title">
        <svg viewBox="0 0 68 48" width="68" height="48" aria-hidden="true">
          <path
            d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
            fill="#f00"
          />
          <path d="M 45,24 27,14 27,34" fill="#fff" />
        </svg>
      </button>
    </template>
  </div>
</template>

<script setup>
defineProps({
  id: { type: String, required: true },
  title: { type: String, default: "YouTube video" },
});

const activated = ref(false);
function activate() {
  activated.value = true;
}
</script>

<style scoped>
.yt-lite {
  position: relative;
  aspect-ratio: 16 / 9;
  background: #000;
  cursor: pointer;
  max-width: 100%;
  margin-bottom: 1rem;
  overflow: hidden;
}

.yt-lite img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.yt-lite iframe {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
}

.yt-lite-play {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  background: transparent;
  cursor: pointer;
  padding: 0;
}

.yt-lite-play svg {
  transition: transform 0.2s ease;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4));
}

.yt-lite:hover .yt-lite-play svg {
  transform: scale(1.1);
}
</style>
