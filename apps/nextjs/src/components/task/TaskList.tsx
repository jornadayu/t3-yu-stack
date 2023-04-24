import AddIcon from '@mui/icons-material/Add';
import { Box, IconButton, Stack, TextField } from '@mui/material';
import { NextComponentType } from 'next';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '~/utils/api';

import TaskCard from './TaskCard';

const TaskList: NextComponentType = () => {
  const utils = api.useContext();

  const { data: tasks } = api.task.all.useQuery();

  const [newTaskDescription, setNewTaskDescription] = useState<string>('');

  const addTask = api.task.add.useMutation({
    onSuccess() {
      setNewTaskDescription('');
      toast.success('Task added successfully');
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
    <>
      <Stack width='100%' direction='row'>
        <TextField
          fullWidth
          value={newTaskDescription}
          onChange={(event) => setNewTaskDescription(event.target.value)}
        />

        <IconButton
          disabled={!newTaskDescription}
          onClick={() => addTask.mutate({ description: newTaskDescription })}
          color='primary'
          sx={{ m: 2 }}
        >
          <AddIcon />
        </IconButton>
      </Stack>

      <Box mt={1} />

      <Stack direction='column' gap={2} sx={{ width: '100%', mb: 2 }}>
        {tasks?.map((task) => (
          <TaskCard task={task} />
        ))}
      </Stack>
    </>
  );
};

export default TaskList;
