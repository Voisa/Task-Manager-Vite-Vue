<template>
  <div class="tasks-board">
    <WeekFilter v-model:modelValue="selectedDay" />
    <!-- Панель бейджей статуса (фиксируется в правом верхнем углу) -->
    <div class="status-badges" aria-hidden>
  <div class="badge not-done">Не выполнено: <span class="count">{{ notDone.length }}</span></div>
  <div class="badge done">Выполнено: <span class="count">{{ done.length }}</span></div>
    </div>
  <!-- Левая колонка: невыполненные задачи -->
    <section class="column">
      <h2 class="visually-hidden">Не выполненные</h2>
      <div class="list">
        <TaskItem
          v-for="task in notDoneFiltered"
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
      <h2 class="visually-hidden">Выполненные</h2>
      <div class="list">
        <TaskItem
          v-for="task in doneFiltered"
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
import WeekFilter from './WeekFilter.vue';

// Props: массив задач и (опционально) выбранный день (v-model).
// Компонент представления — он не мутирует задачи напрямую, а испускает события вверх при действиях.
const props = defineProps<{ tasks: Task[]; modelValue?: string }>();
const emit = defineEmits<{
  (e: 'toggle-done', id: string): void;
  (e: 'update', task: Task): void;
  (e: 'delete', id: string): void;
  (e: 'update:modelValue', val: string): void;
}>();

// Вычисляемые списки разделяют задачи по флагу done.
const notDone = computed(() => props.tasks.filter(t => !t.done));
const done = computed(() => props.tasks.filter(t => t.done));

// Выбор дня недели для фильтрации. 'all' — без фильтра.
// Поддерживаем v-model: если родитель передаёт modelValue — используем его,
// иначе работаем с внутренним состоянием `internalSelected`.
import { ref } from 'vue';
const internalSelected = ref<'all' | string>('all');
const selectedDay = computed<'all' | string>({
  get() {
    return (props.modelValue ?? internalSelected.value) as any;
  },
  set(v) {
    if (props.modelValue !== undefined) {
      emit('update:modelValue', v);
    } else {
      internalSelected.value = v as any;
    }
  }
});

function filterByDay(list: Task[]) {
  if (selectedDay.value === 'all') return list;
  // Показываем задачи без дня (null/undefined) всегда
  return list.filter(t => (t.day ?? null) === selectedDay.value || t.day == null);
}

const notDoneFiltered = computed(() => filterByDay(notDone.value));
const doneFiltered = computed(() => filterByDay(done.value));

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

.week-filter {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}
.week-filter button {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid transparent;
  background: rgba(255,255,255,0.04);
  color: #fff;
  cursor: pointer;
}
.week-filter button.active {
  background: rgba(255,255,255,0.12);
}

/* Панель бейджей статуса — позиционирование можно отрегулировать через
   CSS-переменные: --status-top и --status-right (по умолчанию 12px). */
.status-badges {
  position: fixed;
  top: var(--status-top, 12px);
  right: var(--status-right, 12px);
  display: flex;
  gap: 8px;
  z-index: 50;
}
.status-badges .badge {
  padding: 8px 10px;
  border-radius: 8px;
  background: rgba(0,0,0,0.45);
  color: #fff;
  font-weight: 600;
}
.status-badges .badge.done { background: rgba(40,167,69,0.12); }
.status-badges .badge.not-done { background: rgba(255,99,71,0.12); }

.visually-hidden { position: absolute !important; height: 1px; width: 1px; overflow: hidden; clip: rect(1px, 1px, 1px, 1px); white-space: nowrap; }
</style>