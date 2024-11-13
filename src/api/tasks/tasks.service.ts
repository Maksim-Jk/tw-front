import { apiService } from '../api.service';
import type { CreateTask, Task } from './task.types';

const TasksUrl = {
  tasks: '/v1/tasks',
};

export class TasksService {
  static async getTasks(typeId?: number): Promise<Task[]> {
    const { data } = await apiService.get<Task[]>(TasksUrl.tasks, {
      type_id: typeId ?? undefined,
    });
    return data;
  }

  static async createTask(task: CreateTask): Promise<Task> {
    const { data } = await apiService.post<Task>(TasksUrl.tasks, task);
    return data;
  }
}
