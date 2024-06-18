import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SideMenu.css';

const SideMenu = ({ closeMenu }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    toggleMenu(); // Close the menu when a link is clicked
    if (closeMenu) {
      closeMenu(); // Additional callback if provided
    }
  };

  return (
    <div className={`side-menu ${isOpen ? 'open' : ''}`}>
      <button className="menu-toggle" onClick={toggleMenu}>
        {isOpen ? 'Close Menu' : 'Open Menu'}
      </button>
      {isOpen && (
        <nav>
          <ul>
            <li>
              <Link to="/" onClick={handleLinkClick}>Home</Link>
            </li>
            <li>
              <Link to="/create-task" onClick={handleLinkClick}>Create Task</Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default SideMenu;