export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  due_date?: string;
  created_at?: string;
}

export interface SubTask {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  task: number;
  due_date?: string;
  created_at?: string;
}

export interface ApiError {
  errors?: Record<string, string[]>;
  error?: string;
}
