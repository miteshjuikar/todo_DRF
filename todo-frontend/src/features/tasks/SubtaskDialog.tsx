import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { SubTask } from '../../types';

interface SubtaskDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<SubTask, 'id' | 'created_at' | 'task'>) => void;
  initialData?: Partial<SubTask>;
}

type SubtaskForm = Omit<SubTask, 'id' | 'created_at' | 'task'>;

const SubtaskDialog: React.FC<SubtaskDialogProps> = ({ open, onClose, onSubmit, initialData }) => {
  const { control, handleSubmit, reset } = useForm<SubtaskForm>({
    defaultValues: { title: '', description: '', due_date: '', completed: false },
  });

  React.useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title || '',
        description: initialData.description || '',
        due_date: initialData.due_date || '',
        completed: initialData.completed || false,
      });
    } else {
      reset({ title: '', description: '', due_date: '', completed: false });
    }
  }, [initialData, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{initialData ? 'Edit Subtask' : 'Add Subtask'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <Controller
              name="title"
              control={control}
              rules={{ required: 'Title required' }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Title"
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
                <TextField {...field} label="Description" multiline rows={3} fullWidth />
              )}
            />

            <Controller
              name="due_date"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Due Date (optional)"
                  type="datetime-local"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />

            <Controller
              name="completed"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox checked={!!field.value} onChange={(e) => field.onChange(e.target.checked)} />}
                  label={field.value ? 'Completed' : 'Pending'}
                />
              )}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">{initialData ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SubtaskDialog;
