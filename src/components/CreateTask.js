import React, { useState } from 'react';
import { db } from '../services/firebase'; // Adjust path as per your project structure

const CreateTask = () => {
  const [taskName, setTaskName] = useState('');
  const [progress, setProgress] = useState('Not Started');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const taskData = {
        taskName,
        progress,
        description,
        dueDate,
        priority,
        createdAt: new Date().toISOString(), // Ensure createdAt is in ISO string format
      };

      console.log('Task data:', taskData); // Log task data before submission

      // Add task to Firestore
      const docRef = await db.collection('tasks').add(taskData);
      console.log('Task added with ID:', docRef.id);

      // Clear form fields after submission
      setTaskName('');
      setProgress('Not Started');
      setDescription('');
      setDueDate('');
      setPriority('Low');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div>
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Task Name:
          <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} required />
        </label>
        <br />
        <label>
          Progress on Completion:
          <select value={progress} onChange={(e) => setProgress(e.target.value)} required>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Needs Review">Needs Review</option>
            <option value="Done">Done</option>
          </select>
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <br />
        <label>
          Due Date:
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
        </label>
        <br />
        <label>
          Priority:
          <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </label>
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateTask;