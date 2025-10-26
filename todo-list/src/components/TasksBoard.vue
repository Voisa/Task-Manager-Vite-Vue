<template>
  <div class="tasks-board">
  <!-- Левая колонка: невыполненные задачи -->
    <section class="column">
      <h2>Не выполненные</h2>
      <div class="list">
        <TaskItem
          v-for="task in notDone"
          :key="task.id"
          :task="task"
          @toggle-done="onToggleDone"
          @update="onUpdate"
          @delete="onDelete"
        />
      </div>
    </section>

  <!-- Правая колонка: выполненные задачи -->
    <section class="column">
      <h2>Выполненные</h2>
      <div class="list">
        <TaskItem
          v-for="task in done"
          :key="task.id"
          :task="task"
          @toggle-done="onToggleDone"
          @update="onUpdate"
          @delete="onDelete"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Task } from '../data/tasks';
import TaskItem from './TaskItem.vue';

// Props: массив задач, переданный от родителя. Компонент представления — он не
// мутирует задачи напрямую, а испускает события вверх при действиях.
const props = defineProps<{ tasks: Task[] }>();
const emit = defineEmits<{ (e: 'toggle-done', id: string): void; (e: 'update', task: Task): void; (e: 'delete', id: string): void }>();

// Вычисляемые списки разделяют задачи по флагу done.
const notDone = computed(() => props.tasks.filter(t => !t.done));
const done = computed(() => props.tasks.filter(t => t.done));

function onToggleDone(id: string) {
  emit('toggle-done', id);
}

function onUpdate(task: Task) {
  emit('update', task);
}

function onDelete(id: string) {
  emit('delete', id);
}
</script>

<style>
.tasks-board {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}
.column {
  background: rgba(255,255,255,0.03);
  padding: 12px;
  border-radius: 8px;
}
.column h2 {
  margin: 0 0 8px 0;
}
.list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>