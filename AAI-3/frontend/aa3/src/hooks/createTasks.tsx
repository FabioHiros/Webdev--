// hooks/useCreateTask.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Define the type for the new task
interface NewTask {
  name: string;
  status: boolean;
}

const createTask = async (newTask: NewTask) => {
    console.log('huh?')
   await axios.post('http://localhost:3000/todos', newTask);

};

export const useCreateTask = () => {
    const queryClient = useQueryClient(); 
    return useMutation({mutationFn:(task: NewTask) => createTask(task),
    onSuccess: () => {
        console.log('Success');
        queryClient.invalidateQueries({ queryKey: ['tasks'] });
      }
  }
);
};
