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
}
.week-filter button {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid transparent;
  background: rgba(255,255,255,0.04);
  color: #fff;
  cursor: pointer;
}
.week-filter button.active {
  background: rgba(255,255,255,0.12);
}
</style>
