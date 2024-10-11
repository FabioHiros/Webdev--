// CreateTaskModal.tsx
import React, { useState } from 'react';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ isOpen, onClose, onSave }) => {
  const [newTaskName, setNewTaskName] = useState<string>('');

  const handleSave = () => {
    if (!newTaskName.trim()) {
      alert('Task name cannot be empty'); // Alert if task name is empty
      return;
    }
    onSave(newTaskName);
    setNewTaskName(''); // Clear input field
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create New Task</h2>
        <input
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default CreateTaskModal;
