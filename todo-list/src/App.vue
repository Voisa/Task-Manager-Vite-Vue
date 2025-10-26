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
        @delete="deleteTask"
      />
    </div>
    <p v-if="tasks.length === 0">Список дел пуст</p>
  </div>
</template>

<script setup lang="ts">
import AddTaskForm from "./components/AddTaskForm.vue";
import TasksBoard from "./components/TasksBoard.vue";
import { useTasks } from './composables/useTasks';

// Используем composable для управления задачами и их персистентности
const { tasks, createTask, toggleDone, updateTask, deleteTask } = useTasks();
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