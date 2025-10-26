import { ref, watch } from 'vue';
import { initialTasks, type Task } from '../data/tasks';

// Ключ для localStorage
const STORAGE_KEY = 'todo-list.tasks';

// Храним tasks в реактивной переменной
const tasks = ref<Task[]>([]);

// Загружаем задачи из localStorage или используем initialTasks как fallback
function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      tasks.value = [...initialTasks];
      return;
    }
    const parsed = JSON.parse(raw) as Task[] | null;
    tasks.value = parsed && Array.isArray(parsed) ? parsed : [...initialTasks];
  } catch (e) {
    // Если чтение/парсинг упал — используем начальные данные
    tasks.value = [...initialTasks];
  }
}

// Сохраняем задачи в localStorage с debounce, чтобы не писать при каждом изменении мгновенно
let saveTimer: ReturnType<typeof setTimeout> | null = null;
function scheduleSave() {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks.value));
    } catch (e) {
      console.warn('Не удалось сохранить задачи в localStorage', e);
    }
  }, 250);
}

// Инициализация и наблюдение
loadTasks();
watch(tasks, scheduleSave, { deep: true });

// Функции управления задачами — возвращаем из composable
function createTask(payload: { title: string; text: string; day?: string | null }) {
  const id = Date.now().toString();
  tasks.value.unshift({ id, title: payload.title, text: payload.text, done: false, day: payload.day ?? null });
}

function toggleDone(id: string) {
  const i = tasks.value.findIndex(t => t.id === id);
  const task = tasks.value[i];
  if (task) task.done = !task.done;
}

function updateTask(updated: Task) {
  const i = tasks.value.findIndex(t => t.id === updated.id);
  if (i !== -1) tasks.value[i] = { ...tasks.value[i], ...updated };
}

function deleteTask(id: string) {
  tasks.value = tasks.value.filter(t => t.id !== id);
}

export function useTasks() {
  return { tasks, createTask, toggleDone, updateTask, deleteTask };
}
