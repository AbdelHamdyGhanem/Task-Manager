import React, { useState } from 'react';
import { db } from '../services/firebase';
import './CreateTask.css'; // Adjust path as per your project structure

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
        createdAt: new Date().toISOString(),
      };

      console.log('Task data:', taskData);

      const docRef = await db.collection('tasks').add(taskData);
      console.log('Task added with ID:', docRef.id);

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
    <div className="container">
      <div className="form-wrapper">
        <h2>Create Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Task Name:</label>
            <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Progress on Completion:</label>
            <select value={progress} onChange={(e) => setProgress(e.target.value)} required>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Needs Review">Needs Review</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Due Date:</label>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Priority:</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
          <button type="submit" className="submit-btn">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;