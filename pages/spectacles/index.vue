<template>
  <div class="list-shows">
    <div v-for="show in shows" :key="show._path">
      <div class="show">
        <div class="show-details">
          <NuxtLink :to="show.sitemap.loc">
            <h2
              class="show-title"
              :style="{ 'text-decoration-color': 'transparent' }"
            >
              {{ show.title }}
            </h2></NuxtLink
          >
          <MDC class="show-description" :value="show.description" />
          <div class="show-dates" v-if="show.dates">
            <div
              v-for="(date, idx) in sortDates(show.dates)"
              :key="idx"
              class="date"
            >
              <a
                :class="`show-date ${date.datetime > today ? '' : 'passed'}`"
                :href="date.dates_url"
                target="_blank"
              >
                <div class="show-lieu">{{ date.theatre_text }}</div>
                <div class="show-dates-text">{{ date.date_text }}</div></a
              >
            </div>
          </div>
        </div>
        <div class="show-img-wrapper">
          <NuxtPicture
            class="show-img"
            :src="show.images[0].src"
            format="avif,webp"
            sizes="450px md:650px xl:900px"
            densities="x1 x2"
            quality="90"
            loading="lazy"
            :style="{ 'outline-color': show.color }"
            :img-attrs="{ alt: show.images[0].caption, loading: 'lazy' }"
          />
        </div>
      </div>
      <span class="line-limit"></span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const shows = ref([]);

const today = new Date();

const { data: fetchedShows } = await useAsyncData("spectacles", () =>
  queryContent("spectacles").find()
);

shows.value =
  fetchedShows.value.sort((a, b) => a.navigation.order - b.navigation.order) ||
  [];
console.log(shows.value);

function sortDates(dates) {
  return [...dates].sort((a, b) => a.datetime - b.datetime);
}
</script>

<style scoped>
.list-shows {
  padding-bottom: 10rem;
  display: flex;
  flex-direction: column;
  gap: 20rem;
  text-align: end;
}

.show {
  display: flex;
  flex-direction: row-reverse;
  gap: calc(2rem + 8vw);
  width: 100%;
  /* justify-content: space-between; */
  justify-content: end;

  /* border-bottom: solid 1px; */
}

.show-title {
  text-decoration: underline 2px;
  text-align: left;
}

.show-details {
  min-width: 400px;
  text-align: justify;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex-shrink: 2;
}

:deep(.show-description) {
  /* padding-top: 4rem; */
  text-transform: lowercase;
}

.show-dates {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  /* font-size: smaller; */
  text-transform: lowercase;
  /* padding-top: 2rem; */
}
.show-dates .show-date {
  display: flex;
  flex-direction: row;
  gap: 3rem;
  justify-content: space-between;
}

.show-lieu {
  max-width: 300px;
  flex-shrink: 2;
  text-align: left;
}

.show-dates-text {
  flex-shrink: 0;
}

.show-date.passed {
  color: #6e6e6e;
}

.show-img-wrapper {
  flex-shrink: 1;
  max-width: 800px; /* Default max width on larger screens */
  max-height: 600px;
  height: auto;
  /* width: 100%; */
  /* padding-top: 4rem; */
}

.show-img {
  /* padding: 3rem; */
  box-sizing: border-box;
  /* outline: solid 2px; */
  /* flex-shrink: 2; */
  width: auto;
  max-width: 100%;
  height: 500px;
  /* max-height: 300px; */
}

.show-img:deep(img) {
  height: auto;
  width: 100%;
  object-fit: cover;
  object-position: center;
  /* padding: 3rem; */
  /* box-sizing: border-box; */
  /* outline: solid 2px; */
  /* flex-shrink: 2; */
  /* width: auto; */
  /* max-width: 100%; */
  /* height: auto; */
  /* max-height: 300px; */
}

.line-limit {
  /* display: block;
  border-bottom: 1px solid #ccc;
  position: absolute;
  width: 80vw;
  left: 10vw; */
}

@media screen and (max-width: 1080px) {
  .show {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10rem;
  }
}

@media screen and (max-width: 700px) {
  .show-img {
    /* max-width: 90%;
    width: 90%; */
    width: 100%;
    max-width: 100%;
  }
}

/* Mobile-specific styles */
@media screen and (max-width: 650px) {
  .show-img {
    max-width: 100%;
    width: 100%;
  }
}
</style>
