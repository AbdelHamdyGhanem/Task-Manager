import React, { useState } from 'react';

const Preferences = ({ onSavePreferences }) => {
  const [backgroundColor, setBackgroundColor] = useState('#ffffff'); // Default background color is white

  const handleColorChange = (event) => {
    setBackgroundColor(event.target.value);
  };

  const handleSavePreferences = () => {
    onSavePreferences(backgroundColor); // Call parent component function to save preferences
  };

  return (
    <div>
      <h2>Preferences</h2>
      <div>
        <label>Select Background Color:</label>
        <input
          type="color"
          value={backgroundColor}
          onChange={handleColorChange}
        />
      </div>
      <button onClick={handleSavePreferences}>Save Preferences</button>
    </div>
  );
};

export default Preferences;