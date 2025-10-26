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
  { id: "1", title: "Купить продукты", text: "Молоко, хлеб, яйца" },
  { id: "2", title: "Закончить проект", text: "Доделать UI и отправить на ревью" },
  { id: "3", title: "Позвонить другу", text: "Договориться о встрече" },
];
</script>

<style>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.tasks {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>