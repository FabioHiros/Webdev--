// hooks/useDeleteTask.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const deleteTask = async (taskId: number) => {
    await axios.delete(`http://localhost:3000/todos/${taskId}`);
};

export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    return useMutation( { mutationFn: deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['tasks']});
        },
    });
};
