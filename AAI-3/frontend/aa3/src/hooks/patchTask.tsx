import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface Task {
  id: number;
  name: string;
  status: boolean;
}

const editTask = async (task: Task) => {
  console.log('EditHOOK')
  await axios.patch(`http://localhost:3000/todos/${task.id}`, task);
};

export const useEditTask = () => {
    const queryClient = useQueryClient(); 
    return useMutation({
    mutationFn: (task: Task) => editTask(task),
    onMutate: () => {
      console.log('Mutate');
    },
    onSuccess: () => {
      console.log('Success');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });
};
