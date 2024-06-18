import React from 'react';
import './Home.css'; // Import your CSS for Home component

const Home = ({ user }) => {
  return (
    <div className="home-container">
      <div className="content">
        <div className="progress-columns">
          <div className="column">
            <h3>Not Started</h3>
            {/* Tasks for "Not Started" */}
          </div>
          <div className="column">
            <h3>In Progress</h3>
            {/* Tasks for "In Progress" */}
          </div>
          <div className="column">
            <h3>Needs Review</h3>
            {/* Tasks for "Needs Review" */}
          </div>
          <div className="column">
            <h3>Done</h3>
            {/* Tasks for "Done" */}
          </div>
        </div>
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