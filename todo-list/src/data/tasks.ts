// Модель задачи, используемая в приложении. Добавили поле `done`, чтобы состояние
// выполнения было централизовано и чтобы можно было разделять задачи по колонкам.
export type Task = { id: string; title: string; text: string; done?: boolean };

// Начальные задачи. `done` помечает, выполнена ли задача.
export const initialTasks: Task[] = [
  { id: '1', title: 'Убраться', text: 'Вынести мусор, помыть пол', done: false },
  { id: '2', title: 'ДЗ по Веб', text: 'Создать веб приложение на vue', done: false },
  { id: '3', title: 'Отдых', text: 'Зайти в SCX, Освоить touchdesign', done: true },
];
