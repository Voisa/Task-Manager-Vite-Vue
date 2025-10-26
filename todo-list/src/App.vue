<template>
  <div class="container">
    <h1>Список дел</h1>
    <div class="tasks">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
      />
    </div>
    <p v-if="tasks.length === 0">Список дел пуст</p>
  </div>
</template>

<script setup lang="ts">
import TaskItem from "./components/TaskItem.vue";

const tasks = [
  { id: "1", title: "Убраться", text: "Вынести мусор, помыть пол" },
  { id: "2", title: "ДЗ по Веб", text: "Создать веб приложение на vue" },
  { id: "3", title: "Отдых", text: "Зайти в SCX, Освоить touchdesign" },
];
</script>

<style>
body {
  margin: 0;
}

.container {
  max-width: 600px;
  margin: 0;
  padding: 0; /* remove padding so header sits at exact top-left */
}

.tasks {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style> 