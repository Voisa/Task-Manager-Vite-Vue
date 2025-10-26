<template>
  <div class="container">
    <h1>Список дел</h1>
    <AddTaskForm @create="createTask" />
    <div class="tasks">
    <!-- TasksBoard отображает две колонки: не выполненные и выполненные. Он испускает события вверх. -->
      <TasksBoard
        :tasks="tasks"
        @toggle-done="toggleDone"
        @update="updateTask"
      />
    </div>
    <p v-if="tasks.length === 0">Список дел пуст</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AddTaskForm from "./components/AddTaskForm.vue";
import TasksBoard from "./components/TasksBoard.vue";
import { initialTasks, type Task } from './data/tasks';

const tasks = ref<Task[]>([ ...initialTasks ]);

function createTask(payload: { title: string; text: string }) {
  const id = Date.now().toString();
  tasks.value.unshift({ id, title: payload.title, text: payload.text });
}

function toggleDone(id: string) {
  const i = tasks.value.findIndex(t => t.id === id);
  const task = tasks.value[i];
  if (task) task.done = !task.done;
}

function updateTask(updated: Task) {
  const i = tasks.value.findIndex(t => t.id === updated.id);
  if (i !== -1) {
    // заменить поля, сохраняя остальные свойства
    tasks.value[i] = { ...tasks.value[i], ...updated };
  }
}
</script>

<style>
body {
  margin: 0;
}

.container {
  max-width: 600px;
  margin: 0;
  padding: 0; /* убираем отступ, чтобы заголовок был прямо в левом верхнем углу */
}

.tasks {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style> 