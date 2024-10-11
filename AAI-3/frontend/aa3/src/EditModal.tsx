// EditTaskModal.tsx
import React, { useState, useEffect } from 'react';

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  currentTaskName: string;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ isOpen, onClose, onSave, currentTaskName }) => {
  const [newTaskName, setNewTaskName] = useState(currentTaskName);
  const [error, setError] = useState<string | null>(null); // State for error message

  // Update the input when the current task name changes
  useEffect(() => {
    setNewTaskName(currentTaskName);
    setError(null); // Reset error when opening modal
  }, [currentTaskName, isOpen]);

  const handleSave = () => {
    const trimmedName = newTaskName.trim(); // Trim whitespace
    if (trimmedName === '') {
      setError('Task name cannot be empty'); // Set error message
      return; // Prevent further execution
    }

    onSave(trimmedName); // Call onSave with the new task name
    onClose(); // Close the modal after saving
  };

  if (!isOpen) return null; // Don't render anything if not open

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Task</h2>
        {error && <div className="error">{error}</div>} {/* Display error message */}
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

export default EditTaskModal;
