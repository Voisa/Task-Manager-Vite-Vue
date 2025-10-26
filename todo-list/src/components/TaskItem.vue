<template>
  <div class="task-card">
    <header>
      <div v-if="!editing">
        <h3>{{ props.task.title }}</h3>
      </div>
      <div v-else>
        <input v-model="editTitle" />
      </div>
    </header>
    <main>
      <div v-if="!editing">
        <p>{{ props.task.text }}</p>
      </div>
      <div v-else>
        <textarea v-model="editText"></textarea>
      </div>

      <div class="controls">
        <button
          type="button"
          :class="{ done: props.task.done }"
          @click="toggleDone"
          :aria-pressed="props.task.done"
        >
          {{ props.task.done ? 'Выполнено' : 'Отметить' }}
        </button>

        <button type="button" @click="startEdit" v-if="!editing">Редактировать</button>
        <div v-else>
          <button type="button" @click="saveEdit">Сохранить</button>
          <button type="button" @click="cancelEdit">Отменить</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Task } from '../data/tasks';

const props = defineProps<{ task: Task }>();
const emit = defineEmits<{ (e: 'update', payload: Task): void; (e: 'toggle-done', id: string): void }>();

// Используем централизованное поле `done`, хранящееся в объекте задачи.
// При переключении испускаем событие, чтобы родитель обновил общий массив задач.
function toggleDone() {
  emit('toggle-done', props.task.id);
}

// --- Логика редактирования ---
const editing = ref(false);
const editTitle = ref(props.task.title);
const editText = ref(props.task.text);

function startEdit() {
  editTitle.value = props.task.title;
  editText.value = props.task.text;
  editing.value = true;
}

function cancelEdit() {
  editTitle.value = props.task.title;
  editText.value = props.task.text;
  editing.value = false;
}

function saveEdit() {
  const updated: Task = {
    id: props.task.id,
    title: editTitle.value,
    text: editText.value,
  };
  emit('update', updated);
  editing.value = false;
}
</script>

<style>
.task-card {
  border: 5px solid #000000;
  padding: 16px;
  border-radius: 8px;
  background-color: #b63636;
  position: relative; /* необходимо для абсолютного позиционирования кнопок */
}

.task-card header {
  margin-bottom: 8px;
}

.task-card h3 {
  margin: 0;
  color: #ffffff;
  font-size: 1.5em;
}

.task-card p {
  margin: 0;
  color: #000000;
  font-weight: 750;
}

button {
  background: #1a1a1a;
  color: #fff;
  border: 1px solid transparent;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background-color 0.18s ease, color 0.18s;
}

/* состояние после клика */
button.done {
  background-color: #28a745; /* зелёный */
  color: #fff;
  border-color: #1f7a2e;
}

/* hover когда уже done */
button.done:hover {
  filter: brightness(1.05);
}

.task-card .controls {
  position: absolute;
  right: 12px;
  bottom: 12px;
  display: flex;
  gap: 8px;
}

.task-card .controls button {
  /* slightly smaller controls in corner */
  padding: 6px 10px;
}
</style>