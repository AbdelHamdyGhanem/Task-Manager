import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { auth } from './services/firebase';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import SideMenu from './components/SideMenu';
import CreateTask from './components/CreateTask';

function App() {
  const [user, setUser] = useState(null);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const navigate = useNavigate();

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
      navigate('/'); // This should work correctly now
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const closeSideMenu = () => {
    setIsSideMenuOpen(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        {user && window.location.pathname === '/' && (
          <>
            <p>Welcome, {user.displayName}!</p>
            <button onClick={handleSignOut}>Sign out</button>
          </>
        )}
        {!user && (
          <button onClick={handleSignIn}>Sign in with Google</button>
        )}
      </header>
      <SideMenu isOpen={isSideMenuOpen} closeMenu={closeSideMenu} />
      <Routes>
        <Route path="/" element={<div>Home Page Content</div>} />
        <Route path="/create-task" element={<CreateTask />} />
        {/* Define more routes here */}
      </Routes>
    </div>
  );
}

export default App;