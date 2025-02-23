<template>
  <ContentPage :page="page" />
</template>

<script setup>
import { ref, watch } from "vue";
import ContentPage from "~/components/ContentPage.vue";
const { data: page } = await useAsyncData("contact", () => {
  return queryCollection("contact").first();
});
</script>

<style scoped></style>
