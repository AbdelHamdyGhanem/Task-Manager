import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import './History.css';

const History = ({ onRestoreTask }) => {
  const [deletedTasks, setDeletedTasks] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'deletedTasks'),
      orderBy('deletedAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedTasks = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDeletedTasks(fetchedTasks);
    }, (error) => {
      console.error('Error fetching deleted tasks:', error);
    });

    return () => unsubscribe();
  }, []);

  const handleRestoreTask = async (taskId) => {
    try {
      const taskRef = doc(db, 'deletedTasks', taskId);
      const taskSnapshot = await getDoc(taskRef);

      if (taskSnapshot.exists()) {
        const taskData = taskSnapshot.data();
        const newTaskRef = doc(db, 'tasks', taskId);
        await setDoc(newTaskRef, {
          ...taskData,
          status: 'active',
        });

        await deleteDoc(taskRef);
        console.log('Restored task with ID:', taskId);

        // Call the onRestoreTask prop function to update tasks in Home component
        onRestoreTask({ id: taskId, ...taskData });
      } else {
        console.error('Task not found in deletedTasks collection:', taskId);
      }
    } catch (error) {
      console.error('Error restoring task:', error);
    }
  };

  const handlePermanentlyDeleteTask = async (taskId) => {
    try {
      const taskRef = doc(db, 'deletedTasks', taskId);
      await deleteDoc(taskRef);
      console.log('Permanently deleted task with ID:', taskId);
      // Optionally, show animation or message (not implemented here)
    } catch (error) {
      console.error('Error permanently deleting task:', error);
    }
  };

  return (
    <div className="history-container">
      <h2>Deleted Tasks History</h2>
      <div className="history-list">
        {deletedTasks.length > 0 ? (
          deletedTasks.map(task => (
            <div key={task.id} className="history-item">
              <p><strong>Task Name:</strong> {task.taskName}</p>
              <p><strong>Description:</strong> {task.description}</p>
              <p><strong>Deleted At:</strong> {task.deletedAt ? new Date(task.deletedAt.seconds * 1000).toLocaleString() : 'Unknown'}</p>
              <div className="btn-container">
                <button className="history-btn restore-btn" onClick={() => handleRestoreTask(task.id)}>Restore</button>
                <button className="history-btn delete-btn" onClick={() => handlePermanentlyDeleteTask(task.id)}>Permanently Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No deleted tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default History;