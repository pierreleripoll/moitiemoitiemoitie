<template>
  <div class="dates">
    <div v-for="(date, idx) in computedDates" :key="idx">
      <div
        :class="`date ${new Date(date.date_end) > today ? '' : 'passed'}`"
        :href="date.dates_url"
        target="_blank"
      >
        <a :href="date.dates_url" target="_blank" class="lieu">
          {{ date.theatre_text }}
          <div v-if="detailed" class="show-title">{{ date.showTitle }}</div>
        </a>
        <a :href="date.ticket_url" target="_blank" class="dates-text">
          {{ date.date_text }}
          <div class="show-title">{{ date.date_hint }}</div>
        </a>
      </div>
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
  detailed: {
    type: Boolean,
    default: false,
  },
  max: Number,
  sitemap: String,
  today: Date,
});

// Default today to new Date() if not provided
const today = props.today || new Date();

const sortedDates = computed(() =>
  [...props.dates].sort((a, b) => new Date(a.date_end) - new Date(b.date_end))
);

const computedDates = computed(() => {
  return props.max ? sortedDates.value.slice(0, props.max) : sortedDates.value;
});
</script>

<style scoped>
.show-title {
  color: grey;
}
.dates {
  display: flex;
  flex-direction: column;
  font-size: smaller;
  gap: 1.5rem;
  text-transform: lowercase;
  box-sizing: border-box;
}

.dates-text {
  text-align: right;
}

.dates .date {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: space-between;
}
.lieu {
  max-width: 300px;
  text-align: left;
  flex-shrink: 2;
}

.dates-text {
  flex-shrink: 1;
}
.date.passed {
  color: #6e6e6e;
}
</style>
