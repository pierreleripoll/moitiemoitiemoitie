<template>
  <div class="welcome">
    <h3 class="disclaimer">
      Plus que
      <span class="days">{{ diffDays }}</span>
      jours avant la première de
      <span class="titre"
        >La <span class="big">grosse</span> déprime
        <span class="exclamation"></span
      ></span>
    </h3>
    <NuxtPicture
      :src="img.src"
      format="avif,webp"
      sizes="450px
    md:650px xl:900px"
      densities="x1 x2"
      quality="90"
      loading="lazy"
      :imgAttrs="{ alt: img.caption, className: 'show-img', loading: 'lazy' }"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

const randomImages = ref([]);

const { data: show } = await useAsyncData("spectacles", () =>
  queryContent("spectacles", "la-grosse-deprime").findOne()
);

console.log(show);

const img = show.value.images[4];

const premiere = new Date(show.value.dates[0].date_start);

const today = new Date();

const diffTime = Math.abs(today - premiere);
const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

console.log(premiere, today);
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

/* We remove the static text and let the ::after generate the exclamations */
.exclamation::after {
  content: "!";
  animation: exclamationAnimation 3s steps(3, end) infinite;
}

.days {
  font-size: 1.5em;
  font-weight: bold;
  /* Apply two animations: one for color and one for font-size */
  animation: colorPulse 3s ease-in-out infinite,
    sizePulse 3s ease-in-out infinite;
}

.titre {
  font-size: 1.5em;
  font-weight: bold;
  /* Apply two animations: one for color and one for font-size */
  animation: colorPulse 3s ease-in-out infinite,
    sizePulse 3s ease-in-out infinite;
}

.big {
  animation: uppercase 3s ease-in-out infinite;
}

@keyframes exclamationAnimation {
  0% {
    content: "!";
  }
  20% {
    content: "!!";
  }
  40% {
    content: "!!!!";
  }
  50% {
    content: "!!!!!";
  }
  60% {
    content: "!!!!";
  }
  80% {
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
