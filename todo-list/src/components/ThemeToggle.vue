<!-- src/components/ThemeToggle.vue -->
<template>
  <button
    class="theme-toggle"
    @click="toggleTheme"
    :aria-label="currentTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
  >
    {{ currentTheme === 'dark' ? '☀️' : '🌙' }}
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Ключ для localStorage
const STORAGE_KEY = 'theme-preference';

// Реактивная переменная для текущей темы
const currentTheme = ref<'light' | 'dark'>('dark');

// Загрузка сохраненной темы из localStorage при монтировании
onMounted(() => {
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  if (savedTheme === 'light' || savedTheme === 'dark') {
    currentTheme.value = savedTheme;
  } else {
    // Если нет сохраненной темы, используем системную настройку
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    currentTheme.value = prefersLight ? 'light' : 'dark';
  }
  // Применяем тему при загрузке
  document.documentElement.setAttribute('data-theme', currentTheme.value);
});

// Функция переключения темы
function toggleTheme() {
  currentTheme.value = currentTheme.value === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme.value);
  localStorage.setItem(STORAGE_KEY, currentTheme.value);
}
</script>

<style scoped>
.theme-toggle {
  position: fixed;
  top: 12px;
  left: 12px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid transparent;
  cursor: pointer;
  font-size: 20px;
  transition: background-color 0.18s ease, color 0.18s ease;
  z-index: 100;
}

.theme-toggle:hover {
  background: rgba(255, 255, 255, 0.2);
}

[data-theme='light'] .theme-toggle {
  background: rgba(0, 0, 0, 0.1);
  color: #213547;
}

[data-theme='light'] .theme-toggle:hover {
  background: rgba(0, 0, 0, 0.2);
}
</style>