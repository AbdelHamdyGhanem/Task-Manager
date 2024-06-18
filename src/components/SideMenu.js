import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SideMenu.css';

const SideMenu = ({ closeMenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (path) => {
    navigate(path); // Navigate to the specified path
    toggleMenu(); // Close the menu
    if (closeMenu) {
      closeMenu(); // Additional callback if provided
    }
  };

  return (
    <div className={`side-menu ${isOpen ? 'open' : ''}`}>
      <button className="menu-toggle" onClick={toggleMenu}>
        {isOpen ? '≡' : '≡'}
      </button>
      {isOpen && (
        <nav>
          <ul>
            <li>
              <button className="menu-button" onClick={() => handleLinkClick('/')}>Home</button>
            </li>
            <li>
              <button className="menu-button" onClick={() => handleLinkClick('/create-task')}>Create Task</button>
            </li>
            {/* Add more menu items as needed */}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default SideMenu;