import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Box, Typography, CircularProgress, Button, List, ListItem, ListItemText, Checkbox, IconButton } from '@mui/material';
import { format } from 'date-fns';
import { taskApi } from '../../api/taskApi';
import { useSubtasks, useCreateSubtask, useUpdateSubtask, useDeleteSubtask } from '../../hooks/useTasks';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SubtaskDialog from './SubtaskDialog';

const TaskDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ['task', id],
    queryFn: () => taskApi.getTask(Number(id)),
    enabled: !!id,
  });

  const { data: subtasks } = useSubtasks();
  const createSubtask = useCreateSubtask();
  const updateSubtask = useUpdateSubtask();
  const deleteSubtask = useDeleteSubtask();

  const [newSubtask, setNewSubtask] = React.useState({
    title: '',
    description: '',
    due_date: '',
    completed: false,
  });
  const [openSubtaskDialog, setOpenSubtaskDialog] = React.useState(false);
  const [editingSubtask, setEditingSubtask] = React.useState<any | null>(null);

  if (isLoading) return (
    <Box display="flex" justifyContent="center" p={4}>
      <CircularProgress />
    </Box>
  );

  if (error || !data) return (
    <Box p={4}>
      <Typography variant="h6">Failed to load task.</Typography>
      <Button onClick={() => navigate(-1)} sx={{ mt: 2 }}>Go Back</Button>
    </Box>
  );

  const task = data.data;

  const taskSubtasks = (subtasks || []).filter((s: any) => s.task === task.id);

  const handleAddSubtask = (data?: any) => {
    const payload = data || newSubtask;
    if (!payload.title?.trim()) return;
    createSubtask.mutate({
      title: payload.title.trim(),
      description: payload.description || undefined,
      due_date: payload.due_date || undefined,
      completed: !!payload.completed,
      task: task.id,
    });
    setNewSubtask({ title: '', description: '', due_date: '', completed: false });
  };

  const handleOpenAdd = () => {
    setEditingSubtask(null);
    setOpenSubtaskDialog(true);
  };

  const handleOpenEdit = (s: any) => {
    setEditingSubtask(s);
    setOpenSubtaskDialog(true);
  };

  const handleSubmitDialog = (data: any) => {
    if (editingSubtask) {
      // update existing
      updateSubtask.mutate({ id: editingSubtask.id, ...data });
    } else {
      handleAddSubtask(data);
    }
    setOpenSubtaskDialog(false);
    setEditingSubtask(null);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>{task.title}</Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>{task.description}</Typography>
      <Typography variant="subtitle2">Status: {task.completed ? 'Completed' : 'Pending'}</Typography>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>Subtasks</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Subtasks</Typography>
          <Button variant="contained" onClick={handleOpenAdd}>Add Subtask</Button>
        </Box>

        <List>
          {taskSubtasks.map((s: any) => (
            <ListItem key={s.id} secondaryAction={
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton edge="end" aria-label="edit" onClick={() => handleOpenEdit(s)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => deleteSubtask.mutate(s.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            }>
              <Checkbox
                checked={s.completed}
                onChange={(e) => updateSubtask.mutate({ id: s.id, completed: e.target.checked })}
              />
              <ListItemText
                primary={s.title}
                secondary={
                  <>
                    {s.description && <Typography variant="body2">{s.description}</Typography>}
                    {s.due_date && <Typography variant="caption">Due: {format(new Date(s.due_date), 'MMM dd, yyyy HH:mm')}</Typography>}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>

        <SubtaskDialog
          open={openSubtaskDialog}
          onClose={() => { setOpenSubtaskDialog(false); setEditingSubtask(null); }}
          initialData={editingSubtask || undefined}
          onSubmit={(data: any) => handleSubmitDialog(data)}
        />

        <Button variant="contained" onClick={() => navigate(-1)}>Back</Button>
      </Box>
    </Box>
  );
};

export default TaskDetail;
