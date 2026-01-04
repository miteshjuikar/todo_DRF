import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Task } from '../../types';
import { Controller, useForm } from 'react-hook-form';

interface TaskDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Task, 'id' | 'created_at'>) => void;
  initialData?: Partial<Task>;
}

type TaskFormData = Omit<Task, 'id' | 'created_at'>;

const TaskDialog: React.FC<TaskDialogProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const { control, handleSubmit, reset } = useForm<TaskFormData>({
    defaultValues: {
      title: '',
      description: '',
      completed: false,
      due_date: '',
    },
  });

  React.useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title || '',
        description: initialData.description || '',
        completed: initialData.completed || false,
        due_date: initialData.due_date || '',
      });
    } else {
      reset({ title: '', description: '', completed: false, due_date: '' });
    }
  }, [initialData, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

    return (
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
              <Controller
                name="title"
                control={control}
                rules={{ required: 'Title is required' }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Task Title"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
              
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    multiline
                    rows={3}
                    fullWidth
                  />
                )}
              />

              <Controller
                name="completed"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={!!field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    }
                    label={field.value ? 'Completed' : 'Pending'}
                  />
                )}
              />
          <DialogTitle>{initialData ? 'Edit Task' : 'Create New Task'}</DialogTitle>

              <Controller
                name="due_date"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Due Date (Optional)"
                    type="datetime-local"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Box>
          </DialogContent>
          
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              {initialData ? 'Update Task' : 'Create Task'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
  );
};

export default TaskDialog;
