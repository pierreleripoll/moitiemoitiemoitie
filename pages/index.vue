<template>
  <div class="container scrollable-container">
    <div class="scrollable">
      <div class="welcome content-maxed-padded">
        <div class="left-column">
          <h3 class="disclaimer">
            <div v-if="isShowCurrentlyPlaying">
              en ce moment à
              <span
                class="theatre"
                :class="{ 'animate-color': animationsActive }"
                >{{ currentShow.theatre_text }}</span
              >
              et jusqu'au
              <span :class="{ 'animate-color': animationsActive }">{{
                formatEndDate
              }}</span>
              on joue :
            </div>
            <div v-else>
              plus que
              <span class="days" :class="{ 'animate-color': animationsActive }"
                >{{ diffDays }} jours</span
              >,
              <span class="hours" :class="{ 'animate-color': animationsActive }"
                >{{ diffHours }} heures</span
              >,
              <span
                class="minutes"
                :class="{ 'animate-color': animationsActive }"
                >{{ diffMinutes }} minutes</span
              >
              et
              <span
                class="seconds"
                :class="{ 'animate-color': animationsActive }"
                >{{ diffSeconds }} secondes</span
              >
            </div>
            <div v-if="!isShowCurrentlyPlaying">
              avant la {{ isPremiere ? "première" : "prochaine date" }} à
              <span class="theatre"> {{ nextShow.theatre_text }} </span> de :
            </div>

            <div
              class="titre"
              :class="{
                'animate-size': animationsActive,
                'animate-color': animationsActive,
              }"
            >
              <NuxtLink :to="show.path" class="show-link">
                La
                <span
                  class="big"
                  :class="{ 'animate-uppercase': animationsActive }"
                  >grosse</span
                >
                déprime
                <span
                  :class="{
                    'exclamation animate-exclamation': animationsActive,
                  }"
                ></span>
              </NuxtLink>
            </div>
          </h3>
        </div>
        <div class="right-column">
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
                className:
                  'show-img' + (animationsActive ? ' animate-rotate' : ''),
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
      </div>

      <div class="footer">
        <div class="content-maxed-padded">
          <h3>
            retrouvez nous sur :
            <a
              href="https://www.instagram.com/collectifmoitiemoitiemoitie/"
              target="_blank"
              rel="noopener"
              >instagram
            </a>
            /
            <a
              href="https://www.facebook.com/moitiemoitiemoitie/?locale=fr_FR"
              target="_blank"
              rel="noopener"
              >facebook
            </a>
            /
            <a href="/contact" rel="noopener">newsletter</a>
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useScrollIndicator } from "@/composables/scrollIndicator";
import { ref, useTemplateRef } from "vue";

useScrollIndicator();

const diffDays = ref(0);
const diffHours = ref(0);
const diffMinutes = ref(0);
const diffSeconds = ref(0);

const animationsActive = ref(false);

const { data: show } = await useAsyncData("welcome", () =>
  queryCollection("spectacles").order("navigation", "ASC").first()
);
const images = show.value.images;
const img = images.length > 3 ? images[3] : images[0];

// Find if there's a currently ongoing show
const now = new Date();
const currentShowIndex = show.value.dates.findIndex(
  (date) => new Date(date.date_start) <= now && new Date(date.date_end) >= now
);

const isShowCurrentlyPlaying = computed(() => currentShowIndex !== -1);
const currentShow = computed(() =>
  isShowCurrentlyPlaying.value ? show.value.dates[currentShowIndex] : null
);
const formatEndDate = computed(() => {
  if (!currentShow.value) return "";
  const endDate = new Date(currentShow.value.date_end);
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(endDate);
});

// Find the next upcoming show
const nextShowIndex = show.value.dates.findIndex(
  (date) => new Date(date.date_start) > new Date()
);

console.log("Next show index", nextShowIndex);

const nextShow = show.value.dates[nextShowIndex];

const isPremiere = nextShowIndex === 0;

const nextShowDate = new Date(nextShow.date_start);

function updateCountdown() {
  const today = new Date();
  const diffTime = Math.max(nextShowDate - today, 0);
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
.footer {
  margin-top: 4rem;
  margin-bottom: 4rem;
  /* border-top: solid rgba(0, 0, 0, 0.6) 1px; */
}

.welcome {
  display: flex;
  flex-direction: row;
  margin-top: 4rem;
  align-items: start;
  justify-content: left;
  gap: 10rem;
  overflow-y: hidden;
  overflow-x: hidden;
}

.left-column {
  text-align: left;
  flex: 0 0 40%;
}

.right-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.theatre {
  font-weight: bold;
}

:deep(.show-img) {
  width: 100%;
  max-height: 50vh;
  height: auto;
}

.cartoon {
  position: relative;
  overflow: hidden;
  max-width: 100vw;
  max-height: 100%;
  z-index: -1;
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
  text-align: left;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 150px;
  /* gap: 1rem; */
  font-size: medium;
  overflow: visible;
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
  z-index: 1;
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
  height: 100px;
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

@media screen and (max-width: 800px) {
  .welcome {
    flex-direction: column;
    gap: 2rem;
    margin-top: 0;
  }

  .right-column {
    margin: auto;
  }
  .disclaimer {
    width: 100%;
    height: 200px;
  }
}

@media screen and (max-width: 600px) {
  .disclaimer {
    text-align: left;
  }
}
</style>
