import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  CardActions,
  Button,
  Checkbox,
  Box,
} from '@mui/material';
import { Task } from '../../types';
import { format } from 'date-fns';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';

interface TaskCardProps {
  task: Task;
  onClick: () => void;
  onDelete: () => void;
  onEdit?: () => void;
  onToggle?: (completed: boolean) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick, onDelete, onEdit, onToggle }) => {
  const getStatusChip = (completed: boolean) => (
    <Chip
      label={completed ? 'Completed' : 'Pending'}
      color={completed ? 'success' : 'default'}
      size="small"
      icon={completed ? <CheckCircleIcon /> : <PendingIcon />}
    />
  );

  return (
    <Card
      sx={{
        minHeight: 220,
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 8,
        },
      }}
      onClick={onClick}
    >
      <CardContent sx={{ flexGrow: 1, pb: '16px !important' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Checkbox
            checked={task.completed}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => onToggle && onToggle(e.target.checked)}
          />
          <Typography variant="h6" noWrap>
            {task.title}
          </Typography>
        </Box>
        
        {task.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {task.description}
          </Typography>
        )}

        {/* Subtask preview when available from tasks-with-subtasks API */}
        {Array.isArray((task as any).subtasks) && (task as any).subtasks.length > 0 && (() => {
          const subs = (task as any).subtasks as any[];
          const total = subs.length;
          const first = subs[0];
          const second = subs[1];
          const third = subs[2];
          const more = total > 3 ? total - 3 : 0;
          return (
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0.5, mt: 1, alignItems: 'start' }}>
              <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {first ? `• ${first.title}` : ''}
              </Typography>

              <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {second ? `• ${second.title}` : ''}
              </Typography>

              <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {third ? `• ${third.title}` : ''}
              </Typography>

              <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'left' }}>
                {more > 0 ? `+${more} more` : ''}
              </Typography>
            </Box>
          );
        })()}

        {task.due_date && (
          <Chip
            label={`Due: ${format(new Date(task.due_date), 'MMM dd')}`}
            size="small"
            variant="outlined"
          />
        )}
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
        {getStatusChip(task.completed)}
        <Button
          size="small"
          startIcon={<EditIcon />}
          onClick={(e) => {
            e.stopPropagation();
            onEdit && onEdit();
          }}
        >
          Edit
        </Button>
        <Button
          size="small"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default TaskCard;
