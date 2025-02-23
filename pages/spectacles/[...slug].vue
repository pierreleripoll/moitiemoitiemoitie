<template>
  <ContentPage v-if="page" :page="page" />
</template>

<script setup lang="ts">
import ContentPage from "~/components/ContentPage.vue";
const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("spectacles").path(route.path).first();
});
</script>
