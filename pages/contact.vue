<template>
  <ContentPage :page="page" />
</template>

<script setup>
import { ref, watch } from "vue";
import ContentPage from "~/components/ContentPage.vue";
const { page } = useContent();
</script>

<style scoped></style>
