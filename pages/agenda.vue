<template>
  <div class="agenda">
    <div class="left-column">
      <h2 class="agenda-title">à venir</h2>
      <div class="show-dates">
        <div v-for="(date, idx) in datesFutur" :key="idx" class="date">
          <a
            :class="`show-date ${
              new Date(date.date_end) > today ? '' : 'passed'
            }`"
            :href="date.dates_url"
            target="_blank"
          >
            <div class="show-lieu">
              <div>{{ date.theatre_text }}</div>
              <div class="show-title">{{ date.showTitle }}</div>
            </div>
            <div class="show-dates-text">{{ date.date_text }}</div></a
          >
        </div>
      </div>

      <span class="line-limit"></span>

      <h2 class="agenda-title">passé</h2>
      <div class="show-dates">
        <div v-for="(date, idx) in datesPassed" :key="idx" class="date">
          <a
            :class="`show-date ${
              new Date(date.date_end) > today ? '' : 'passed'
            }`"
            :href="date.dates_url"
            target="_blank"
          >
            <div class="show-lieu">
              <div>{{ date.theatre_text }}</div>
              <div class="show-title">{{ date.showTitle }}</div>
            </div>
            <div class="show-dates-text">{{ date.date_text }}</div></a
          >
        </div>
      </div>
    </div>
    <div class="right-column">
      <NuxtPicture
        v-for="(img, idx) in randomImages"
        class="show-img"
        :src="img.src"
        format="avif,webp"
        sizes="450px md:650px xl:900px"
        densities="x1 x2"
        quality="90"
        loading="lazy"
        :imgAttrs="{ alt: img.caption, loading: 'lazy' }"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const datesFutur = ref([]);
const datesPassed = ref([]);

const randomImages = ref([]);

const { data: fetchedShows } = await useAsyncData("spectacles", () =>
  queryContent("spectacles").find()
);

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

const today = new Date();
// Flatten dates from all shows and attach the show title
if (fetchedShows.value) {
  const allDates = [];
  fetchedShows.value.forEach((show) => {
    randomImages.value = randomImages.value.concat(
      shuffle(show.images).slice(0, 2)
    );

    if (show.dates && Array.isArray(show.dates)) {
      show.dates.forEach((date) => {
        allDates.push({
          ...date,
          showTitle: show.title,
          color: show.color,
        });
      });
    }
  });

  shuffle(randomImages.value);

  // randomImages.value = randomImages.value.slice(0, 5);

  // Sort dates chronologically
  const dates = allDates.sort(
    (a, b) => new Date(a.date_end) - new Date(b.date_end)
  );
  datesFutur.value = dates.filter((date) => new Date(date.date_end) >= today);
  datesPassed.value = dates.filter((date) => new Date(date.date_end) < today);
}
</script>

<style scoped>
.line-limit {
  display: block;
  border-bottom: 2px solid rgba(0, 0, 0, 0.6);
  margin: 2rem 0;
  width: 100%;
}

.agenda {
  display: flex;
  flex-direction: row;
  width: 100%;
  /* position: relative; */
  text-align: left;
  gap: calc(2rem + 8vw);
}
.left-column,
.right-column {
  gap: 2rem;
  display: flex;
  flex-direction: column;
}

.left-column {
  flex: 1 1 30%;
}

.right-column {
  flex: 1 1 40%;
  max-width: 35%;
  justify-content: space-around;
}

.right-column :deep(img) {
  width: 100%;
  height: auto;
}

.agenda-title {
  text-align: left;
  /* font-size: 2rem; */
  margin-bottom: 5rem;
  /* text-decoration: underline 2px; */
}

.show-dates {
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 10vh;
  gap: 5rem;
  text-transform: lowercase;
  /* padding-top: 2rem; */
}
.show-dates .show-date {
  display: flex;
  flex-direction: row;
  gap: 4rem;
  justify-content: space-between;
}

.show-lieu {
  max-width: 300px;
  flex-shrink: 2;
}

.show-title {
  color: grey;
}

.show-dates-text {
  flex-shrink: 0;
}

@media screen and (max-width: 1080px) {
  .right-column {
    display: none;
  }
}

@media screen and (max-width: 620px) {
  .show-dates {
    gap: 4rem;
    /* text-align: end; */
  }
  .show-dates .show-date {
    /* flex-direction: column; */
    gap: 2rem;
  }
  .show-lieu {
    max-width: 100%;
  }
}

@media screen and (max-width: 620px) {
  .show-dates {
    gap: 3rem;
    text-align: start;
  }
  .show-dates .show-date {
    flex-direction: column;
    gap: 0.5rem;
  }
  .show-lieu {
    max-width: 100%;
  }
}
</style>
