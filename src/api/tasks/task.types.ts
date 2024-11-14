export interface Task {
  id: number;
  title: string;
  description: string;
  page_url: string;
  created_at: string;
  updated_at: string;
  type_id: TaskType;
  status_id: TaskStatus;
  priority_id: TaskPriority;
  flag_ids: TaskFlags[];
  project_id: number;
  created_by: number;
  updated_by: number;
  attachments?: boolean;
}

export type CreateTask = {
  title: string;
  description: string;
  page_url: string;
  type_id: TaskType;
  priority_id: TaskPriority;
  project_id: number;
  flag_ids: TaskFlags[];
  attachments?: File[];
};

export enum TaskFlags {
  URGENT = 1,
  IMPORTANT = 2,
  NORMAL = 3,
  LOW_PRIORITY = 4,
}

export enum TaskPriority {
  HIGHEST = 1,
  HIGH = 2,
  NORMAL = 3,
  LOW = 4,
  LOWEST = 5,
}

export enum TaskStatus {
  CREATED = 1,
  IN_PROGRESS = 2,
  COMPLETED = 3,
  ARCHIVED = 4,
}

export enum TaskType {
  TASK = 1,
  QUESTION = 2,
}
