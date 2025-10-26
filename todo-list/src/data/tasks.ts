// Модель задачи, используемая в приложении. Добавили поле `done`, чтобы состояние
// выполнения было централизовано и чтобы можно было разделять задачи по колонкам.
// Модель задачи: добавляем необязательное поле `day` — ключ дня недели (например 'mon', 'tue'...)
// Используем null/undefined для задач без привязки к дню.
export type Task = { id: string; title: string; text: string; done?: boolean; day?: string | null };

// Начальные задачи. `done` помечает, выполнена ли задача. `day` — необязательное поле.
export const initialTasks: Task[] = [
  { id: '1', title: 'Убраться', text: 'Вынести мусор, помыть пол', done: false, day: 'sat' },
  { id: '2', title: 'ДЗ по Веб', text: 'Создать веб приложение на vue', done: false, day: 'mon' },
  { id: '3', title: 'Отдых', text: 'Зайти в SCX, Освоить touchdesign', done: true, day: 'sun' },
];
