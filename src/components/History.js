import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './History.css';

const History = () => {
  const [deletedTasks, setDeletedTasks] = useState([]);
  const navigate = useNavigate();

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

  const handleDeletePermanently = async (taskId) => {
    try {
      const taskRef = doc(db, 'deletedTasks', taskId);
      await deleteDoc(taskRef);
      console.log('Deleted task permanently with ID:', taskId);
      // Optionally, navigate or update state as needed
    } catch (error) {
      console.error('Error deleting task permanently:', error);
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
              <button onClick={() => handleDeletePermanently(task.id)}>Delete Permanently</button>
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