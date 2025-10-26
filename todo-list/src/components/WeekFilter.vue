<template>
  <div class="week-filter">
    <button :class="{ active: props.modelValue === 'all' }" @click="$emit('update:modelValue', 'all')">Все</button>
    <button v-for="d in days" :key="d.key" :class="{ active: props.modelValue === d.key }" @click="$emit('update:modelValue', d.key)">{{ d.label }}</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{ modelValue: string }>();
const days = [
  { key: 'mon', label: 'Пн' },
  { key: 'tue', label: 'Вт' },
  { key: 'wed', label: 'Ср' },
  { key: 'thu', label: 'Чт' },
  { key: 'fri', label: 'Пт' },
  { key: 'sat', label: 'Сб' },
  { key: 'sun', label: 'Вс' },
];
</script>

<style scoped>
.week-filter {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  flex-direction: row !important; /* force horizontal layout */
  align-items: center !important; /* prevent children stretching vertically */
  flex-wrap: nowrap !important;
  height: auto !important;
}
.week-filter button {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid transparent;
  background: rgba(255,255,255,0.04);
  color: #fff;
  cursor: pointer;
  box-sizing: border-box; /* prevent size shifts when borders/padding change */
  transform: none; /* ensure no scaling */
  transition: background-color 0.18s ease, color 0.18s ease, border-color 0.18s ease; /* limit transition to non-transform properties */
  height: auto !important; /* ensure buttons don't stretch vertically */
  min-height: 34px; /* keep compact readable size */
  min-width: 36px; /* avoid collapsing on very narrow containers */
  align-self: center !important;
}
.week-filter button.active {
  background: rgba(255,255,255,0.12);
}

/* Defensive overrides: prevent any global :hover rules from applying transforms */
.week-filter button:hover,
.week-filter button:focus,
.week-filter button:active {
  transform: none !important;
}
</style>
