<template>
  <div class="task-card">
    <header>
      <h3>{{ props.task.title }}</h3>
    </header>
    <main>
      <p>{{ props.task.text }}</p>
    </main>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  task: { id: string; title: string; text: string };
}>();
</script>

<style>
.task-card {
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.task-card header {
  margin-bottom: 8px;
}

.task-card h3 {
  margin: 0;
  font-size: 1.5em;
}

.task-card p {
  margin: 0;
  color: #555;
}
</style>