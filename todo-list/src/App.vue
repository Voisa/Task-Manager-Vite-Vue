<!-- src/App.vue -->
<template>
  <div class="container">
    <ThemeToggle />
    <h1>Список дел</h1>
    <AddTaskForm @create="createTask" />
    <div class="lifted-week-filter">
      <WeekFilter v-model:modelValue="selectedDay" />
    </div>
    <div class="tasks">
      <TasksBoard
        :tasks="tasks"
        v-model:modelValue="selectedDay"
        @toggle-done="toggleDone"
        @update="updateTask"
        @delete="deleteTask"
      />
    </div>
    <p v-if="tasks.length === 0">Список дел пуст</p>
  </div>
</template>

<script setup lang="ts">
import AddTaskForm from './components/AddTaskForm.vue';
import TasksBoard from './components/TasksBoard.vue';
import WeekFilter from './components/WeekFilter.vue';
import ThemeToggle from './components/ThemeToggle.vue'; // Импорт компонента
import { useTasks } from './composables/useTasks';
import { ref } from 'vue';

const selectedDay = ref<'all' | string>('all');
const { tasks, createTask, toggleDone, updateTask, deleteTask } = useTasks();
</script>

<style>
body {
  margin: 0;
}

.container {
  max-width: 600px;
  margin: 0;
  padding: 0;
}

.tasks {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.lifted-week-filter {
  margin-top: -49px;
  margin-bottom: 6px;
}

.top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>