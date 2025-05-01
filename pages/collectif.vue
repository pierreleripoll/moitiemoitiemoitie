<!-- filepath: /home/pierre/Documents/Code/moitiemoitiemoitie/pages/collectif.vue -->
<template>
  <ContentPage v-if="page" :page="page">
    <div v-for="(person, index) in page.people" :key="index" class="person">
      <h3 class="person-name" @click="togglePerson(index)">
        {{ person.name }}
        <span class="toggle-indicator">
          {{ opened[index] ? "−" : "+" }}
        </span>
      </h3>
      <div v-if="opened[index]" class="person-description">
        {{ person.text }}
      </div>
    </div>
  </ContentPage>
</template>

<script setup>
import { ref, watch } from "vue";
import ContentPage from "~/components/ContentPage.vue";

const { data: page } = await useAsyncData("collectif", () => {
  return queryCollection("collectif").first();
});
// Create a reactive array to track which person is expanded
const opened = ref([]);

watch(
  page,
  (newPage) => {
    if (newPage && newPage.people) {
      // Initially, collapse all persons
      opened.value = newPage.people.map(() => false);
    }
  },
  { immediate: true }
);

function togglePerson(index) {
  opened.value[index] = !opened.value[index];
}
</script>

<style scoped>
.people-list {
  margin-top: 2rem;
}

.person {
  border-bottom: 1px solid rgba(0, 0, 0, 0.6);
  padding: 0rem 0 2rem 0;
}

.person-name {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}

.toggle-indicator {
  margin-left: 1rem;
}

.person-description {
  margin-top: 1rem;
}
</style>
