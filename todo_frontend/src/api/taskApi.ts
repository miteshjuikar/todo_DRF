import axios, { AxiosError } from 'axios';
import { Task, SubTask, ApiError } from '../types';

const API_BASE_URL = 'http://127.0.0.1:8000/api'; // Update with your Django URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskApi = {
  // Task endpoints
  getAllTasks: () => api.get<Task[]>('/tasks/'),
  getTask: (id: number) => api.get<Task>(`/tasks/${id}/`),
  createTask: (data: Omit<Task, 'id'>) => api.post<Task>('/tasks/create/', data),
  updateTask: (id: number, data: Partial<Task>) => api.put<Task>(`/tasks/update/${id}/`, data),
  partialUpdateTask: (id: number, data: Partial<Task>) => api.patch(`/tasks/partial/${id}/`, data),
  deleteTask: (id: number) => api.delete(`/tasks/delete/${id}/`),

  // Subtask endpoints
  getAllSubtasks: () => api.get<SubTask[]>('/subtasks/'),
  getSubtask: (id: number) => api.get<SubTask>(`/subtasks/${id}/`),
  createSubtask: (data: Omit<SubTask, 'id'>) => api.post<SubTask>('/subtasks/create/', data),
  updateSubtask: (id: number, data: Partial<SubTask>) => api.put<SubTask>(`/subtasks/update/${id}/`, data),
  partialUpdateSubtask: (id: number, data: Partial<SubTask>) => api.patch(`/subtasks/partial/${id}/`, data),
  deleteSubtask: (id: number) => api.delete(`/subtasks/delete/${id}/`),

  // Combined endpoint
  getTasksWithSubtasks: () => api.get<any[]>('/subtasks/tasks-with-subtasks/'),
};

export type ApiResponse<T> = {
  data: T;
  error: AxiosError<ApiError> | null;
};
