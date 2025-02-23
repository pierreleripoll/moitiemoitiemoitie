<template>
  <div class="welcome">
    <h3 class="disclaimer">
      Plus que
      <span class="days animate-color">{{ diffDays }} jours</span>,
      <span class="hours animate-color">{{ diffHours }} h</span>,
      <span class="minutes animate-color">{{ diffMinutes }} m</span> et
      <span class="seconds animate-color">{{ diffSeconds }} s</span>
      avant la première de
      <div class="titre animate-size animate-color">
        La <span class="big">grosse</span> déprime
        <span class="exclamation"></span>
      </div>
    </h3>
    <NuxtPicture
      :src="img.src"
      format="avif,webp"
      sizes="450px md:650px xl:900px"
      densities="x1 x2"
      quality="90"
      loading="lazy"
      :imgAttrs="{
        alt: img.caption,
        className: 'show-img animate-rotate',
        loading: 'lazy',
      }"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

const diffDays = ref(0);
const diffHours = ref(0);
const diffMinutes = ref(0);
const diffSeconds = ref(0);

const { data: show } = await useAsyncData("spectacles", () =>
  queryContent("spectacles", "la-grosse-deprime").findOne()
);

const img = show.value.images[4];
const premiere = new Date(show.value.dates[0].date_start);

function updateCountdown() {
  const today = new Date();
  const diffTime = Math.max(premiere - today, 0);
  diffDays.value = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const remainderAfterDays = diffTime % (1000 * 60 * 60 * 24);
  diffHours.value = Math.floor(remainderAfterDays / (1000 * 60 * 60));
  const remainderAfterHours = remainderAfterDays % (1000 * 60 * 60);
  diffMinutes.value = Math.floor(remainderAfterHours / (1000 * 60));
  const remainderAfterMinutes = remainderAfterHours % (1000 * 60);
  diffSeconds.value = Math.floor(remainderAfterMinutes / 1000);
}

onMounted(() => {
  updateCountdown();
  const interval = setInterval(updateCountdown, 1000);
  onUnmounted(() => clearInterval(interval));
});
</script>

<style scoped>
.welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
}

:deep(.show-img) {
  width: 100%;
  max-width: 400px;
  height: auto;
}

.disclaimer {
  text-align: center;
}

.exclamation {
  position: relative;
  display: inline-block;
}

/* Generate animated exclamation marks */
.exclamation::after {
  content: "!";
  animation: exclamationAnimation 3s steps(3, end) infinite;
}

.animate-color {
  animation: colorPulse 3s ease-in-out infinite;
}

:deep(.animate-rotate) {
  animation: rotate 3s linear infinite;
}

/* Shared animation on time units */
.animate-size {
  animation: sizePulse 3s ease-in-out infinite;
}

.days,
.hours,
.minutes,
.seconds,
.titre {
  font-size: 1.5em;
  font-weight: bold;
  /* Apply animations */
}

.titre {
  padding-top: 2rem;
}

/* Additional styling for the big part if needed */
.big {
  animation: uppercase 3s ease-in-out infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes exclamationAnimation {
  0% {
    content: "!";
  }
  10% {
    content: "!!";
  }
  20% {
    content: "!!!";
  }
  30% {
    content: "!!!!";
  }
  40% {
    content: "!!!!!";
  }
  50% {
    content: "!!!!!!";
  }
  60% {
    content: "!!!!!";
  }
  70% {
    content: "!!!!";
  }
  80% {
    content: "!!!";
  }
  90% {
    content: "!!";
  }
  100% {
    content: "!";
  }
}

@keyframes uppercase {
  0% {
    text-transform: lowercase;
  }
  50% {
    text-transform: uppercase;
  }
  100% {
    text-transform: lowercase;
  }
}

@keyframes colorPulse {
  0% {
    color: #000000;
  }
  25% {
    color: #ff0000;
  }
  50% {
    color: #00ff00;
  }
  75% {
    color: #0000ff;
  }
  100% {
    color: #000000;
  }
}

@keyframes sizePulse {
  0% {
    font-size: 1.5em;
  }
  50% {
    font-size: 3em;
  }
  100% {
    font-size: 1.5em;
  }
}
</style>
