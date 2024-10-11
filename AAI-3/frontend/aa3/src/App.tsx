import { useState } from 'react';
import './App.css';
import { GetTasks } from './hooks/fetchTasks';
import { useEditTask } from './hooks/patchTask';
import EditTaskModal from './EditModal';
import { useCreateTask } from './hooks/createTasks';
import CreateTaskModal from './createTaskModal';
import { useDeleteTask } from './hooks/deleteTask';

interface Task {
  id: number;
  name: string;
  status: boolean;
}

function App() {
  const [filter, setFilter] = useState<'all' | 'completed' | 'not_completed'>('all');
  const tasks = GetTasks(filter === 'completed' ? true  : filter === 'not_completed' ? false : undefined);
  const editTaskMutation = useEditTask();
  const createTaskMutation = useCreateTask();
  const deleteTaskMutation = useDeleteTask();
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [currentTaskName, setCurrentTaskName] = useState<string>('');

  if (tasks.isLoading) {
    return <h1>Loading...</h1>;
  }

  if (tasks.isError) {
    return <span>Error Fetching Tasks</span>;
  }

  const handleStatusChange = (task: Task) => {
    const updatedTask = {
      ...task,
      status: !task.status,
    };
    editTaskMutation.mutate(updatedTask);
  };

  const handleDeleteTask = (taskId: number) => {
    deleteTaskMutation.mutate(taskId);
  };

  const handleEditTask = (task: Task) => {
    setCurrentTaskName(task.name);
    setEditingTaskId(task.id);
    setIsEditModalOpen(true);
    setError(null);
  };

  const handleSaveTask = (name: string) => {
    if (editingTaskId === null) return;

    const currentTask = tasks.data?.find(task => task.id === editingTaskId);
    if (!currentTask) return;

    const updatedTask = { id: editingTaskId, name, status: currentTask.status };
    editTaskMutation.mutate(updatedTask, {
      onError: (error: any) => {
        setError(error.response?.data.message || 'An error occurred');
      },
      onSuccess: () => {
        setEditingTaskId(null);
        setCurrentTaskName('');
        setIsEditModalOpen(false);
        setError(null);
      },
    });
  };

  const handleCreateTask = (name: string) => {
    if (!name.trim()) {
      alert('Task name cannot be empty');
      return;
    }

    const newTask = { name, status: false };
    createTaskMutation.mutate(newTask, {
      onError: (error: any) => {
        setError(error.response?.data.message || 'An error occurred');
      },
      onSuccess: () => {
        setIsCreateModalOpen(false);
        setError(null);
      },
    });
  };

  return (
    <>
      <h2>Task List</h2>
      {error && <div className="error">{error}</div>}

      {/* Task Filter Buttons */}
      <div>
        <button onClick={() => setFilter('all')}>All Tasks</button>
        <button onClick={() => setFilter('completed')}>Completed Tasks</button>
        <button onClick={() => setFilter('not_completed')}>Pending Tasks</button>
      </div>

      {/* Create Task Button */}
      <button onClick={() => setIsCreateModalOpen(true)}>Create Task</button>

      {/* Display the filtered tasks */}
      {tasks?.data?.map((task) => (
        <div key={task.id}>
          <p className={task.status ? 'completed' : ''}>
            {task.id}. {task.name} - {task.status ? '✅' : ''}
            <input
              type="checkbox"
              checked={task.status}
              onChange={() => handleStatusChange(task)}
            />
          </p>
          <button onClick={() => handleEditTask(task)}>Edit</button>
          <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
        </div>
      ))}

      {/* Modals */}
      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveTask}
        currentTaskName={currentTaskName}
      />

      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateTask}
      />
    </>
  );
}

export default App;
