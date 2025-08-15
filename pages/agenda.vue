<template>
  <div class="container scrollable-container">
    <div class="agenda-container scrollable">
      <div class="agenda content-maxed-padded">
        <div class="left-column">
          <h2 class="agenda-title">à venir</h2>
          <show-dates :dates="datesFutur" detailed> </show-dates>

          <span class="line-limit"></span>

          <h2 class="agenda-title">passé</h2>
          <div class="show-dates">
            <show-dates :dates="datesPassed" detailed> </show-dates>
          </div>
        </div>
        <div class="right-column">
          <ThumbhashImageWithCredits
            v-for="(img, idx) in projectImages"
            :key="idx"
            :image="img"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useScrollIndicator } from "@/composables/scrollIndicator";
import ShowDates from "@/components/ShowDates.vue";
import { ref } from "vue";

useScrollIndicator();

const datesFutur = ref([]);
const datesPassed = ref([]);
const projectImages = ref([]);

const { data: fetchedShows } = await useAsyncData("agenda", () =>
  queryCollection("spectacles").all()
);

// Function to select representative images from shows
function getProjectImages(shows) {
  const images = [];

  shows.forEach((show) => {
    // Only process each show once
    if (show.images && show.images.length > 0) {
      // Add the first image of each show (or choose any specific image you want)
      const representativeImage = show.images[0];

      // Add show metadata to the image
      images.push({
        ...representativeImage,
        showTitle: show.title,
        showPath: show._path,
      });
    }
  });

  return images;
}

const today = new Date();
// Process shows and dates
if (fetchedShows.value && Array.isArray(fetchedShows.value)) {
  // Get representative image for each project
  // console.log("fetchedShows", fetchedShows.value);
  projectImages.value = getProjectImages(fetchedShows.value);

  // Limit to a reasonable number of images if needed
  if (projectImages.value.length > 5) {
    projectImages.value = projectImages.value.slice(0, 5);
  }

  // Process dates
  const allDates = [];
  fetchedShows.value.forEach((show) => {
    if (show.dates && Array.isArray(show.dates)) {
      show.dates.forEach((date) => {
        allDates.push({
          ...date,
          showTitle: show.title,
          color: show.color,
          showPath: show._path,
        });
      });
    }
  });

  // Sort dates chronologically
  const dates = allDates.sort(
    (a, b) => new Date(a.date_end) - new Date(b.date_end)
  );
  datesFutur.value = dates.filter((date) => new Date(date.date_end) >= today);
  datesPassed.value = dates
    .filter((date) => new Date(date.date_end) < today)
    .sort((a, b) => new Date(b.date_end) - new Date(a.date_end));
}
</script>

<style scoped>
:deep(.dates) {
  /* font-size: medium !important; */
  gap: 2rem !important;
}

:deep(.dates) .date.passed {
  color: inherit;
}

.line-limit {
  display: block;
  border-bottom: 1px solid rgba(0, 0, 0, 0.6);
  margin: 2rem 0;
  width: 100%;
}

.agenda {
  display: flex;
  flex-direction: row;
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
  padding-top: 2rem;
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
  margin-bottom: 2rem;
  /* text-decoration: underline 2px; */
}

.show-dates {
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 5vh;
  gap: 1rem;
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
  .dates {
    gap: 3rem !important;
    text-align: start !important;
  }
  :deep(.dates) .date,
  .show-dates .show-date {
    text-align: start !important;
    flex-direction: column !important;
    gap: 0.5rem !important;
  }

  :deep(.dates) .dates-text {
    text-align: start !important;
  }

  .show-lieu {
    max-width: 100%;
  }
}
</style>
