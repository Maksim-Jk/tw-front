export interface Task {
  id: string;
  title: string;
  type: 'Задача' | 'Вопрос';
  description: string;
  tags: TaskStatus[];
  date: Date | string;
}

export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
