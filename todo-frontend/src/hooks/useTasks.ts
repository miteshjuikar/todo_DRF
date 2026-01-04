import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taskApi } from '../api/taskApi';
import { Task, SubTask } from '../types';

export const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: () => taskApi.getAllTasks().then(res => res.data),
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Task, 'id'>) => taskApi.createTask(data).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['tasksWithSubtasks'] });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: { id: number } & Partial<Task>) => 
      taskApi.partialUpdateTask(id, data).then(res => res.data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['tasksWithSubtasks'] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => taskApi.deleteTask(id).then(res => res.data),
    onSuccess: (_, taskId) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['tasksWithSubtasks'] });
    },
  });
};

export const useTasksWithSubtasks = () => {
  return useQuery({
    queryKey: ['tasksWithSubtasks'],
    queryFn: () => taskApi.getTasksWithSubtasks().then(res => res.data),
  });
};

export const useSubtasks = () => {
  return useQuery({
    queryKey: ['subtasks'],
    queryFn: () => taskApi.getAllSubtasks().then(res => res.data),
  });
};

export const useCreateSubtask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<SubTask, 'id'>) => taskApi.createSubtask(data).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subtasks'] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['tasksWithSubtasks'] });
    },
  });
};

export const useUpdateSubtask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: { id: number } & Partial<SubTask>) =>
      taskApi.partialUpdateSubtask(id, data).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subtasks'] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['tasksWithSubtasks'] });
    },
  });
};

export const useDeleteSubtask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => taskApi.deleteSubtask(id).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subtasks'] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['tasksWithSubtasks'] });
    },
  });
};
