<template>
  <div class="dates">
    <div v-for="(date, idx) in computedDates" :key="idx">
      <a
        :class="`date ${date.datetime > today ? '' : 'passed'}`"
        :href="date.dates_url"
        target="_blank"
      >
        <div class="lieu">{{ date.theatre_text }}</div>
        <div class="dates-text">{{ date.date_text }}</div>
      </a>
    </div>
    <div v-if="max && dates.length > max" class="more-link">
      <a :href="sitemap" class="date" style="text-align: right">
        <div class="lieu">et plus ici</div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  dates: {
    type: Array,
    default: () => [],
  },
  max: Number,
  sitemap: String,
  today: Date,
});

// Default today to new Date() if not provided
const today = props.today || new Date();

const sortedDates = computed(() =>
  [...props.dates].sort((a, b) => a.datetime - b.datetime)
);

const computedDates = computed(() => {
  return props.max ? sortedDates.value.slice(0, props.max) : sortedDates.value;
});
</script>

<style scoped>
.dates {
  display: flex;
  flex-direction: column;
  font-size: smaller;
  gap: 1.5rem;
  text-transform: lowercase;
  box-sizing: border-box;
}
.dates .date {
  display: flex;
  flex-direction: row;
  gap: 3rem;
  justify-content: space-between;
}
.lieu {
  max-width: 300px;
  text-align: left;
}
.dates-text {
  flex-shrink: 0;
}
.date.passed {
  color: #6e6e6e;
}
</style>
