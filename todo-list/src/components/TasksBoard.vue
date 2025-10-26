<template>
  <div class="tasks-board">
    <div class="top-row">
      <div class="week-filter-wrap">
        <WeekFilter v-model:modelValue="selectedDay" />
      </div>
      <!-- Панель бейджей статуса (фиксируется в правом верхнем углу) -->
      <div class="status-badges" aria-hidden>
        <div class="badge not-done">Не выполнено: <span class="count">{{ notDone.length }}</span></div>
        <div class="badge done">Выполнено: <span class="count">{{ done.length }}</span></div>
      </div>
    </div>

    <div class="rows-grid">
      <!-- Рендерим строки: каждая строка содержит левую (неготовые) и правую (готовые) ячейки -->
      <template v-if="rowCount > 0">
        <template v-for="i in rowCount" :key="i">
          <div class="cell">
            <template v-if="notDoneFiltered[i - 1]">
              <TaskItem
                :key="'left-' + (notDoneFiltered[i - 1]?.id)"
                :task="notDoneFiltered[i - 1] as any"
                @toggle-done="onToggleDone"
                @update="onUpdate"
                @delete="onDelete"
              />
            </template>
            <div v-else class="empty-slot"></div>
          </div>

          <div class="cell">
            <template v-if="doneFiltered[i - 1]">
              <TaskItem
                :key="'right-' + (doneFiltered[i - 1]?.id)"
                :task="doneFiltered[i - 1] as any"
                @toggle-done="onToggleDone"
                @update="onUpdate"
                @delete="onDelete"
              />
            </template>
            <div v-else class="empty-slot"></div>
          </div>
        </template>
      </template>
    </div>
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

// Количество строк — максимум из длин двух списков
const rowCount = computed(() => Math.max(notDoneFiltered.value.length, doneFiltered.value.length));

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
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rows-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: minmax(220px, auto); /* ensure rows have a consistent minimum height */
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

.cell {
  display: flex;
  align-items: stretch;
}

.cell .task-card {
  width: 100%;
  /* make task card fill the cell height */
  min-height: 0; /* allow flex to control height */
  display: flex;
  flex-direction: column;
}

.empty-slot {
  width: 100%;
}

.week-filter-wrap {
  grid-column: 1 / -1; /* span both columns so tasks start on the next row */
  align-self: start;
  padding-right: 8px; /* small spacing to the right so it won't touch the column edge */
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