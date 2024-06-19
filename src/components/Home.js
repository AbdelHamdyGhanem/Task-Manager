import React, { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { collection, query, orderBy, onSnapshot, doc, setDoc, getDoc } from 'firebase/firestore';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Confetti from 'react-dom-confetti';
import './Home.css'; // Ensure this path matches your project structure
import { useNavigate } from 'react-router-dom';

const Home = ({ user, layout, tasks, setTasks }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(
      collection(db, 'tasks'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedTasks = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(fetchedTasks);
    }, (error) => {
      console.error('Error fetching tasks:', error);
    });

    return () => unsubscribe();
  }, [setTasks]);

  const handleDelete = async (taskId) => {
    try {
      const taskRef = doc(db, 'tasks', taskId);
      await setDoc(taskRef, { status: 'deleted' }, { merge: true });
      console.log('Task soft deleted successfully with ID:', taskId);

      const taskSnapshot = await getDoc(taskRef);
      if (taskSnapshot.exists()) {
        const taskData = taskSnapshot.data();
        const deletedTaskRef = doc(db, 'deletedTasks', taskId);
        await setDoc(deletedTaskRef, {
          ...taskData,
          deletedAt: new Date(),
        });
        console.log('Task moved to deletedTasks collection with ID:', taskId);
      } else {
        console.error('Task not found in tasks collection:', taskId);
      }

      navigate('/history');
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleProgressChange = async (taskId, newProgress) => {
    try {
      const taskRef = doc(db, 'tasks', taskId);
      await setDoc(taskRef, { progress: newProgress }, { merge: true });
      console.log(`Task with ID: ${taskId} updated to progress: ${newProgress}`);

      if (newProgress === 'Done') {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000); // Hide confetti after 5 seconds
      }
    } catch (error) {
      console.error('Error updating task progress:', error);
    }
  };

  const onDragEnd = async (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const draggedTask = tasks.find(task => task.id === result.draggableId);
    if (draggedTask && source.droppableId !== destination.droppableId) {
      await handleProgressChange(draggedTask.id, destination.droppableId);
    }
  };

  const renderTasks = (status) => (
    tasks
      .filter(task => task.status !== 'deleted' && task.progress === status)
      .map((task, index) => (
        <Draggable key={task.id} draggableId={task.id} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="task-card"
            >
              <h3>{task.taskName}</h3>
              <p>{task.description}</p>
              <p>Due: {task.dueDate}</p>
              <p>Priority: {task.priority}</p>
              <button className="close-btn" onClick={() => handleDelete(task.id)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}
        </Draggable>
      ))
  );

  return (
    <div className={`home-container ${layout}`}>
      <h2>Welcome, {user ? user.displayName : 'Guest'}!</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="tasks-board">
          <Droppable droppableId="Not Started">
            {(provided) => (
              <div className="column" ref={provided.innerRef} {...provided.droppableProps}>
                <h3>Not Started</h3>
                {renderTasks('Not Started')}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="In Progress">
            {(provided) => (
              <div className="column" ref={provided.innerRef} {...provided.droppableProps}>
                <h3>In Progress</h3>
                {renderTasks('In Progress')}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="Needs Review">
            {(provided) => (
              <div className="column" ref={provided.innerRef} {...provided.droppableProps}>
                <h3>Needs Review</h3>
                {renderTasks('Needs Review')}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="Done">
            {(provided) => (
              <div className="column" ref={provided.innerRef} {...provided.droppableProps}>
                <h3>Done</h3>
                {renderTasks('Done')}
                {provided.placeholder}
                <Confetti active={showConfetti} config={{ spread: 180, elementCount: 100 }} />
                {showConfetti && <div className="celebration-message">Task completed! 🎉</div>}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Home;