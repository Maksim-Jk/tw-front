import { apiService } from '../api.service';
import type { CreateTask, Task, TaskResponse } from './task.types';

const TasksUrl = {
  tasks: '/v1/tasks',
};

export class TasksService {
  static async getTasks(typeId?: number, params: Record<string, any> = {}): Promise<TaskResponse> {
    const { data } = await apiService.get<TaskResponse>(TasksUrl.tasks, {
      params: {
        type_id: typeId ?? undefined,
        ...Object.fromEntries(
          Object.entries(params).filter(
            ([_, value]) => value !== null && value !== undefined && value !== ''
          )
        ),
      },
    });
    return data;
  }

  static async getTask(taskId: string): Promise<Task> {
    const { data } = await apiService.get<Task>(`${TasksUrl.tasks}/${taskId}`);
    return data;
  }

  static async updateTask(taskId: string, taskData: CreateTask | FormData): Promise<Task> {
    const formData = this.prepareFormData(taskData);
    const { data } = await apiService.put<Task>(`${TasksUrl.tasks}/${taskId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  }

  static async createTask(taskData: CreateTask | FormData): Promise<Task> {
    const formData = this.prepareFormData(taskData);
    const { data } = await apiService.post<Task>(TasksUrl.tasks, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  }

  static async deleteTask(taskId: string): Promise<void> {
    await apiService.delete(`${TasksUrl.tasks}/${taskId}`);
  }

  static async deleteManyTasks(taskIds: string[]): Promise<void> {
    await apiService.delete(TasksUrl.tasks, {
      data: { ids: taskIds },
    });
  }

  private static prepareFormData(taskData: CreateTask | FormData): FormData {
    if (taskData instanceof FormData) {
      return taskData;
    }

    const formData = new FormData();

    // Добавляем основные поля
    formData.append('title', taskData.title);
    formData.append('description', taskData.description);
    formData.append('type_id', String(taskData.type_id));
    formData.append('priority_id', String(taskData.priority_id));
    formData.append('page_url', taskData.page_url);
    formData.append('project_id', String(taskData.project_id));

    // Добавляем флаги, если они есть
    if (taskData?.flag_ids && taskData.flag_ids.length > 0) {
      taskData.flag_ids.forEach((flagId) => {
        formData.append('flag_ids[]', String(flagId));
      });
    }

    // Добавляем один файл
    if (taskData.file) {
      formData.append('file', taskData.file);
    }

    return formData;
  }
}
