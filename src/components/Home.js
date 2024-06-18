import React from 'react';
import './Home.css'; // Import your CSS for Home component

const Home = ({ user }) => {
  return (
    <div className="home-container">
      <div className="content">
        {/* Your task columns or sections */}
      </div>
      {user && (
        <div className="user-profile">
          <img src={user.photoURL} alt="User Profile" className="user-avatar" />
          <span className="user-name">{user.displayName}</span>
        </div>
      )}
    </div>
  );
};

export default Home;