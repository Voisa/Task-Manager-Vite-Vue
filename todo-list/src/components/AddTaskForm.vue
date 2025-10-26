<template>
  <form class="add-task" @submit.prevent="onSubmit">
    <input v-model="title" placeholder="Заголовок" required />
    <textarea v-model="text" placeholder="Описание (опционально)"></textarea>
    <div class="actions">
      <button type="submit">Добавить задачу</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const emit = defineEmits<(e: 'create', payload: { title: string; text: string }) => void>();

const title = ref('');
const text = ref('');

function onSubmit() {
  const t = title.value.trim();
  const tx = text.value.trim();
  if (!t) return;
  emit('create', { title: t, text: tx });
  title.value = '';
  text.value = '';
}
</script>

<style>
.add-task {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 12px 0;
}
.add-task input,
.add-task textarea {
  width: 100%;
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-family: inherit;
}
.add-task .actions {
  display: flex;
  justify-content: flex-end;
}
.add-task button {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid transparent;
  background: #1a1a1a;
  color: #fff;
}
</style>
