<template>
  <div class="task-card">
    <header>
      <h3>{{ props.task.title }}</h3>
    </header>
    <main>
      <p>{{ props.task.text }}</p>
            <button
        type="button"
        :class="{ done: done }"
  @click="toggleDone"
  :aria-pressed="done"
      >
        {{ done ? 'Выполнено' : 'Отметить' }}
      </button>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{ task: { id: string; title: string; text: string } }>();

// локальное состояние с сохранением в localStorage (чтобы кнопка оставалась зелёной после перезагрузки)
const storageKey = `task-${props.task.id}-done`;
const done = ref<boolean>(localStorage.getItem(storageKey) === '1');

function toggleDone() {
  done.value = !done.value;
}

// синхронизируем в localStorage при изменении
watch(done, (val) => {
  try {
    localStorage.setItem(storageKey, val ? '1' : '0');
  } catch (e) {
    // в некоторых окружениях (например, приватный режим) localStorage может быть недоступен
  }
});
</script>

<style>
.task-card {
  border: 5px solid #000000;
  padding: 16px;
  border-radius: 8px;
  background-color: #b63636;
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
</style>