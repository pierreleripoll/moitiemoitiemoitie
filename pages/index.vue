<template>
  <div class="welcome">
    <h3 class="disclaimer">
      Plus que
      <span class="days" :class="{ 'animate-color': animationsActive }"
        >{{ diffDays }} jours</span
      >,
      <span class="hours" :class="{ 'animate-color': animationsActive }"
        >{{ diffHours }} h</span
      >,
      <span class="minutes" :class="{ 'animate-color': animationsActive }"
        >{{ diffMinutes }} m</span
      >
      et
      <span class="seconds" :class="{ 'animate-color': animationsActive }"
        >{{ diffSeconds }} s</span
      >
      avant la première de
      <div
        class="titre"
        :class="{
          'animate-size': animationsActive,
          'animate-color': animationsActive,
        }"
      >
        La
        <span class="big" :class="{ 'animate-uppercase': animationsActive }"
          >grosse</span
        >
        déprime
        <span
          :class="{ 'exclamation animate-exclamation': animationsActive }"
        ></span>
      </div>
    </h3>

    <div
      :class="{
        cartoon: true,
        'animate-rotate': animationsActive,
      }"
    >
      <div ref="bubble" class="bubble bubble-bottom-left">
        Si seulement nous avions un bouton pour moins stresser...
      </div>

      <NuxtPicture
        :src="img.src"
        format="avif,webp"
        sizes="450px md:650px xl:900px"
        densities="x1 x2"
        quality="90"
        loading="lazy"
        :imgAttrs="{
          alt: img.caption,
          className: 'show-img' + (animationsActive ? ' animate-rotate' : ''),
          loading: 'lazy',
        }"
      />
    </div>

    <button
      ref="stressButton"
      class="stress-button"
      @click="
        () => {
          animationsActive = !animationsActive;
          idxText++;
        }
      "
    >
      Bouton pour moins stresser
    </button>
  </div>
</template>

<script setup>
import { ref, useTemplateRef } from "vue";

const diffDays = ref(0);
const diffHours = ref(0);
const diffMinutes = ref(0);
const diffSeconds = ref(0);

const animationsActive = ref(false);

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

const idxText = ref(0);
const stressButton = useTemplateRef("stressButton");
const bubble = useTemplateRef("bubble");
watch(idxText, (idx) => {
  if (idx >= listTexts.length - 1) {
    stressButton.value.style.visibility = "hidden";
  }

  if (idx >= listTexts.length) {
    bubble.value.innerHTML = "Mais ???? Vous êtes un HACKER ????";
  } else bubble.value.innerHTML = listTexts[idx];
});

const listTexts = [
  "Ça va beaucoup mieux !!!!!!!!",
  "Ça va beaucoup mieux !!!!!!!!",
  "Oooooh.... Pourquoi ? C'était si bien !",
  "Ouiiiii, la joie à nouveau !!",
  "Mais ??? Ça commence à bien faire cette histoire !",
  "Aaaaaaaah... On savait que vous finiriez par être raisonnable !",
  "Non mais là on va se fâcher vous savez ?",
  "On vous l'enlève parce que vraiment c'est trop bon !",
];

onMounted(() => {
  updateCountdown();
  const interval = setInterval(updateCountdown, 1000);
  onUnmounted(() => clearInterval(interval));
});
</script>

<style scoped>
.welcome {
  display: flex;
  padding-bottom: 2rem;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
  overflow-y: hidden;
  overflow-x: hidden;
}

:deep(.show-img) {
  width: 100%;
  max-width: 400px;
  height: auto;
}

.cartoon {
  position: relative;
  overflow: hidden;
  max-width: 100vw;
  max-height: 100%;
}

.bubble {
  font-size: small;
  max-width: 120px;
  position: absolute;
  background-color: white;
  border: solid 1px;
  border-radius: 20px;
  padding: 10px;
  left: 40%;
  top: 30%;
}
.bubble-bottom-left:before {
  content: "";
  width: 0px;
  height: 0px;
  position: absolute;
  border-left: 16px solid #fff;
  border-right: 12px solid transparent;
  border-top: 4px solid #fff;
  border-bottom: 20px solid transparent;
  left: 32px;
  bottom: -20px;
}

.disclaimer {
  text-align: center;
  width: 100%;
}

.exclamation {
  position: relative;
  display: inline-block;
}

/* Generate animated exclamation marks */
.exclamation.animate-exclamation::after {
  content: "!";
  animation: exclamationAnimation 3s steps(3, end) infinite;
}

.stress-button {
  background-color: white;
  cursor: pointer;
}

.animate-color {
  animation: colorPulse 3s ease-in-out infinite;
}

:deep(.animate-rotate) {
  animation: rotate 2s linear infinite;
}

/* Shared animation on time units */
.animate-size {
  animation: sizePulse 3s linear infinite;
}

.animate-color,
.animate-size {
  font-size: 1.5em;
  font-weight: bold;
  /* Apply animations */
}

.days,
.hours,
.minutes,
.seconds {
  display: inline-block;
  min-width: fit-content;
}

.seconds {
  width: 50px;
}

.titre {
  padding-top: 2rem;
  font-size: 1.5em;
  font-weight: bold;
}

/* Additional styling for the big part if needed */
.animate-uppercase {
  animation: uppercase 3s linear infinite;
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
    content: "";
  }
  50% {
    content: "!!!";
  }
  100% {
    content: "";
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
    font-size: 2.3em;
  }
  100% {
    font-size: 1.5em;
  }
}
</style>
