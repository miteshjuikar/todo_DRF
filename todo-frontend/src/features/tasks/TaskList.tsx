import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Fab,
  Alert,
  Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import {
  useTasks,
  useTasksWithSubtasks,
  useCreateTask,
  useDeleteTask,
  useUpdateTask,
} from '../../hooks/useTasks';
import TaskCard from './TaskCard';
import TaskDialog from './TaskDialog';

const TaskList: React.FC = () => {
  const navigate = useNavigate();
  const { data: tasks, isLoading, error } = useTasksWithSubtasks();
  const createMutation = useCreateTask();
  const deleteMutation = useDeleteTask();
  const updateMutation = useUpdateTask();

  const [openDialog, setOpenDialog] = React.useState(false);
  const [editingTask, setEditingTask] = React.useState<any | null>(null);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Tasks
        </Typography>
        <Fab
          color="primary"
          onClick={() => setOpenDialog(true)}
          sx={{ boxShadow: 0 }}
        >
          <AddIcon />
        </Fab>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to load tasks
        </Alert>
      )}

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 3 }}>
        {tasks?.map((task: any) => (
          <Box key={task.id}>
            <TaskCard
              task={task}
              onDelete={() => deleteMutation.mutate(task.id)}
              onClick={() => navigate(`/task/${task.id}`)}
              onEdit={() => {
                setEditingTask(task);
                setOpenDialog(true);
              }}
              onToggle={(completed: boolean) => {
                updateMutation.mutate({ id: task.id, completed });
              }}
            />
          </Box>
        ))}
      </Box>

      <TaskDialog
        open={openDialog}
        initialData={editingTask || undefined}
        onClose={() => {
          setOpenDialog(false);
          setEditingTask(null);
        }}
        onSubmit={(data: any) => {
          if (editingTask) {
            updateMutation.mutate(
              { id: editingTask.id, ...data },
              {
                onSuccess: () => {
                  setOpenDialog(false);
                  setEditingTask(null);
                },
              }
            );
          } else {
            createMutation.mutate(data, {
                onSuccess: (newTask: any) => {
                  setOpenDialog(false);
                  if (newTask && typeof newTask.id !== 'undefined') {
                    navigate(`/task/${newTask.id}`);
                  }
                  // otherwise just close dialog and let list refresh
                },
            });
          }
        }}
      />
    </Box>
  );
};

export default TaskList;
