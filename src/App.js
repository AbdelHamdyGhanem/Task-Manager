import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { auth } from './services/firebase';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import './App.css'; // Import your global CSS styles
import SideMenu from './components/SideMenu';
import CreateTask from './components/CreateTask';
import Home from './components/Home'; // Assuming Home component is in './components/Home.js'
import History from './components/History';


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
      <SideMenu isOpen={isSideMenuOpen} closeMenu={closeSideMenu} />
      <Routes>
        <Route path="/history" element={<History />} />
        <Route path="/" element={<Home user={user} />} />
        <Route path="/create-task" element={<CreateTask />} />
        {/* Define more routes here */}
      </Routes>
    </div>
  );
}

export default App;