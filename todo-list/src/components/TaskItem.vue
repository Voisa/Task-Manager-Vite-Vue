<template>
  <div :class="['task-card', { 'no-day': props.task.day == null }]">
    <header>
      <div v-if="!editing" class="title-row">
        <h3>{{ props.task.title }}</h3>
        <span class="day-badge">{{ dayLabel }}</span>
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
        <div v-if="editing">
          <button type="button" @click="saveEdit">Сохранить</button>
          <button type="button" @click="cancelEdit">Отменить</button>
        </div>
      </div>
  <!-- Отдельная кнопка редактирования в правом верхнем углу -->
  <button v-if="!editing" class="edit-btn" type="button" @click="startEdit" aria-label="Редактировать">✎</button>
  <!-- Кнопка удаления в левом нижнем углу карточки -->
  <button v-if="!editing" class="delete-btn" type="button" @click.prevent="emit('delete', props.task.id)" aria-label="Удалить">🗑</button>
  <!-- Кнопка состояния (Done) в правом нижнем углу карточки -->
  <button v-if="!editing" class="done-btn" type="button" :class="{ done: props.task.done }" @click.prevent="toggleDone" :aria-pressed="props.task.done">{{ props.task.done ? '✖' : '✔' }}</button>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Task } from '../data/tasks';

const props = defineProps<{ task: Task }>();
const emit = defineEmits<{ (e: 'update', payload: Task): void; (e: 'toggle-done', id: string): void; (e: 'delete', id: string): void }>();

const dayMap: Record<string, string> = {
  mon: 'Пн',
  tue: 'Вт',
  wed: 'Ср',
  thu: 'Чт',
  fri: 'Пт',
  sat: 'Сб',
  sun: 'Вс',
};

const dayLabel = props.task.day ? (dayMap[props.task.day] ?? props.task.day) : 'Без дня';

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
  padding: 24px; /* более компактный внутренний отступ */
  border-radius: 8px;
  background-color: #b63636;
  position: relative; /* необходимо для абсолютного позиционирования кнопок */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 220px; /* одинаковая минимальная высота карточки */
}

.task-card header {
  margin-bottom: 8px;
}

.task-card .title-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.task-card .day-badge {
  font-size: 0.85rem;
  padding: 4px 8px;
  border-radius: 6px;
  background: rgba(255,255,255,0.08);
  color: #fff;
  border: 1px solid rgba(255,255,255,0.06);
}

.task-card h3 {
  margin: 0;
  color: #ffffff;
  font-size: 1.5em;
}

/* стиль для задач без привязки к дню — синий фон */
.task-card.no-day {
  background-color: #1f6fe0; /* яркий синий */
}

.task-card.no-day p,
.task-card.no-day h3 {
  color: #ffffff;
}

.task-card p {
  margin: 0;
  color: #000000;
  font-weight: 750;
}

.task-card main {
  /* main занимет оставшееся пространство, чтобы карточки выравнивались по высоте */
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  background: rgba(0,0,0,0.25); /* полупрозрачный фон, чтобы кнопки читались на фоне */
  padding: 6px 10px;
  border-radius: 8px;
  z-index: 5; /* поверх содержимого карточки */
}

.task-card .controls button {
  /* slightly smaller controls in corner */
  padding: 6px 10px;
}

/* маленькая кнопка редактирования в правом верхнем углу */
.task-card .edit-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 6px; /* маленькая квадратичная кнопка */
  width: 30px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-size: 14px;
  line-height: 1;
  background: rgba(0,0,0,0.6);
  color: #fff;
  border: 1px solid transparent;
  cursor: pointer;
  z-index: 10;
}

.task-card .edit-btn:hover {
  background: rgba(0,0,0,0.75);
}

/* маленькая кнопка удаления в левом нижнем углу */
.task-card .delete-btn {
  position: absolute;
  left: 8px;
  bottom: 8px;
  width: 30px;
  height: 30px;
  padding: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: rgba(0,0,0,0.6);
  color: #fff;
  border: 1px solid transparent;
  cursor: pointer;
  z-index: 10;
}

.task-card .delete-btn:hover {
  background: rgba(0,0,0,0.75);
}

/* кнопка 'готово' в правом нижнем углу */
.task-card .done-btn {
  position: absolute;
  right: 8px;
  bottom: 8px;
  width: 34px;
  height: 34px;
  padding: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: rgba(0,0,0,0.6);
  color: #fff;
  border: 1px solid transparent;
  cursor: pointer;
  z-index: 10;
}

.task-card .done-btn.done {
  background-color: #28a745; /* зелёный когда выполнено */
  border-color: #1f7a2e;
}

.task-card .done-btn:hover {
  background: rgba(0,0,0,0.75);
}
</style>