<template>
  <div class="agenda">
    <h2 class="agenda-title">à venir</h2>
    <div class="show-dates">
      <div v-for="(date, idx) in datesFutur" :key="idx" class="date">
        <a
          :class="`show-date ${date.datetime > today ? '' : 'passed'}`"
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
    <h2 class="agenda-title">passé</h2>
    <div class="show-dates">
      <div v-for="(date, idx) in datesPassed" :key="idx" class="date">
        <a
          :class="`show-date ${date.datetime > today ? '' : 'passed'}`"
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
</template>

<script setup>
import { ref } from "vue";

const datesFutur = ref([]);
const datesPassed = ref([]);

const { data: fetchedShows } = await useAsyncData("spectacles", () =>
  queryContent("spectacles").find()
);
const today = new Date();
// Flatten dates from all shows and attach the show title
if (fetchedShows.value) {
  const allDates = [];
  fetchedShows.value.forEach((show) => {
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
  // Sort dates chronologically
  const dates = allDates.sort((a, b) => a.datetime - b.datetime);
  datesFutur.value = dates.filter((date) => date.datetime >= today);
  datesPassed.value = dates.filter((date) => date.datetime < today);
}
</script>

<style scoped>
.agenda {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 800px;
  /* position: relative; */
  text-align: left;
}

.agenda-title {
  text-align: left;
  font-size: 2rem;
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
