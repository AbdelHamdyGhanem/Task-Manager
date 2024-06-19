import React, { useState, useEffect } from 'react';
import { auth } from './services/firebase';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import './App.css'; // Import your global CSS styles
import SideMenu from './components/SideMenu';
import CreateTask from './components/CreateTask';
import Home from './components/Home';
import History from './components/History';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route for nested routing

function App() {
  const [user, setUser] = useState(null);
  const [layout, setLayout] = useState('columns'); // Default layout is columns
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Optionally, navigate to another page after sign out
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  const handleSavePreferences = (newLayout) => {
    setLayout(newLayout);
  };

  const handleRestoreTask = (restoredTask) => {
    setTasks(prevTasks => [...prevTasks, restoredTask]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <div className="welcome">
            {user && window.location.pathname === '/' && (
              <p>Welcome, {user.displayName}!</p>
            )}
          </div>
          <div className="auth-buttons">
            {user ? (
              <button className="sign-out-btn" onClick={handleSignOut}>Sign out</button>
            ) : (
              <button className="sign-in-btn" onClick={handleSignIn}>Sign in with Google</button>
            )}
          </div>
        </div>
      </header>
      <SideMenu user={user} />
      {/* Use nested routing for content */}
      <Routes>
        <Route path="/" element={<Home user={user} layout={layout} tasks={tasks} setTasks={setTasks} />} />
        <Route path="/create-task" element={<CreateTask />} />
        <Route path="/history" element={<History onRestoreTask={handleRestoreTask} />} />
      </Routes>
    </div>
  );
}

export default App;