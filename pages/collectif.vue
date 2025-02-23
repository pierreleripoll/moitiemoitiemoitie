<template>
  <ContentPage :page="page" />
</template>

<script setup lang="ts">
import ContentPage from "~/components/ContentPage.vue";
const { page } = useContent();

console.log(page.value.body);
</script>
