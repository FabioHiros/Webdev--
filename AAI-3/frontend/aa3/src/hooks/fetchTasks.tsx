import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Task {
  id: number;
  name: string;
  status: boolean;
}

const fetchTasks = async (status?: boolean) => {
    const { data } = await axios.get<Task[]>('http://localhost:3000/todos', {
      params: { status },
    });
    return data;
  };
  
export const GetTasks = (status?: boolean) => {
    return useQuery({
      queryKey: ['tasks', status], // Pass status in queryKey
      queryFn: () => fetchTasks(status), // Pass status to fetchTasks
    });
  };

