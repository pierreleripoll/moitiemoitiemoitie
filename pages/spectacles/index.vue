<template>
  <div class="list-shows">
    <div v-for="show in shows" :key="show._path">
      <div class="show">
        <div class="show-description">
          <h3>{{ show.title }}</h3>
          <p>{{ show.description }}</p>
        </div>
        <img class="show-img" :src="show.images[0].src" :alt="show.title" />
      </div>
      <span class="line-limit"></span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const shows = ref([]);

const { data: fetchedShows } = await useAsyncData("spectacles", () =>
  queryContent("spectacles").find()
);

shows.value = fetchedShows.value || [];
console.log(shows.value);
</script>

<style scoped>
.list-shows {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 6rem;
  text-align: end;
}

.show {
  display: flex;
  flex-direction: row-reverse;
  gap: 10rem;
  width: 100%;
  /* justify-content: space-between; */
  justify-content: end;
  padding-bottom: 6rem;
  /* border-bottom: solid 1px; */
}

.show-description {
  max-width: 400px;
}

.show-img {
  /* width: 100%; */
  max-width: 600px; /* Default max width on larger screens */
  max-height: 400px;
}
.flex-shrink {
  flex-shrink: 1;
  width: auto;
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
    justify-content: end;
    align-items: end;
    gap: 1rem;
  }
}

@media screen and (max-width: 700px) {
  .show-img {
    max-width: 90%;
    width: 90%;
  }
}

/* Mobile-specific styles */
@media screen and (max-width: 650px) {
  .show-img {
    max-width: 90%;
    width: 90%;
  }
}
</style>
