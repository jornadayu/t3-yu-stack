import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Card, IconButton, Stack, Typography } from '@mui/material';
import { Task } from '@yu/db';
import dayjs from 'dayjs';
import { NextComponentType } from 'next';
import { toast } from 'react-toastify';
import { api } from '~/utils/api';

interface Props {
  task: Task;
}

const TaskCard: NextComponentType<{}, Props, Props> = ({ task }) => {
  const utils = api.useContext();

  const addRemove = api.task.remove.useMutation({
    onSuccess() {
      toast.success('Task removed successfully');
      void utils.task.all.invalidate();
    },
    onError(error) {
      if (error.data?.code === 'UNAUTHORIZED') {
        toast.error('Not authenticated');
      } else {
        console.log(error);
      }
    },
  });

  return (
    <Card sx={{ p: 2 }}>
      <Stack direction='row' alignItems='center' flexWrap='wrap'>
        <Typography sx={{ wordBreak: 'break-all' }} variant='body1'>
          {task.description}
        </Typography>

        <Box flex={1} />

        <Stack direction='row' gap={1} alignItems='center'>
          <Typography variant='subtitle1'>
            {dayjs(task.created_at).fromNow()}
          </Typography>

          <IconButton
            color='secondary'
            disabled
            onClick={() => addRemove.mutate({ id: task.id })}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            color='secondary'
            onClick={() => addRemove.mutate({ id: task.id })}
          >
            <ClearIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Card>
  );
};

export default TaskCard;
